import { Injectable, inject } from '@angular/core';
import MiniSearch from 'minisearch';
import type { DocPage, NavSection } from '../../models/docs.types';
import { DocsService } from '../../services/docs.service';
import { LocaleService } from '../../services/locale.service';
import type { DocSearchEntry, DocSearchResult } from './doc-search.types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_~>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSections(markdown: string) {
  const sections: { title: string; content: string }[] = [];
  const lines = markdown.split('\n');
  let currentHeading: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)$/);
    if (headingMatch) {
      if (currentHeading) {
        sections.push({ title: currentHeading, content: currentContent.join('\n') });
      }
      currentHeading = headingMatch[1].replace(/\*\*/g, '').trim();
      currentContent = [];
    } else if (currentHeading) {
      currentContent.push(line);
    }
  }

  if (currentHeading) {
    sections.push({ title: currentHeading, content: currentContent.join('\n') });
  }

  return sections;
}

function uniqueSectionId(route: string, title: string, usedIds: Set<string>) {
  const baseFragment = slugify(title);
  let fragment = baseFragment;
  let id = `${route}#${fragment}`;
  let counter = 2;

  while (usedIds.has(id)) {
    fragment = `${baseFragment}-${counter}`;
    id = `${route}#${fragment}`;
    counter++;
  }

  usedIds.add(id);
  return { id, fragment };
}

function buildEntries(docs: DocPage[], navigation: NavSection[]): DocSearchEntry[] {
  const labels = Object.fromEntries(navigation.map((section) => [section.category, section.label]));
  const entries: DocSearchEntry[] = [];
  const usedIds = new Set<string>();

  for (const doc of docs) {
    const category = labels[doc.category] ?? doc.category;

    entries.push({
      id: doc.route,
      title: doc.title,
      category,
      route: doc.route,
      content: stripMarkdown([doc.description, doc.content].filter(Boolean).join(' ')),
    });
    usedIds.add(doc.route);

    for (const section of extractSections(doc.content)) {
      const { id, fragment } = uniqueSectionId(doc.route, section.title, usedIds);
      entries.push({
        id,
        title: section.title,
        category,
        route: doc.route,
        fragment,
        content: stripMarkdown(section.content),
      });
    }
  }

  return entries;
}

@Injectable({ providedIn: 'root' })
export class DocSearchService {
  private readonly docsService = inject(DocsService);
  private readonly localeService = inject(LocaleService);
  private readonly indexes = new Map<string, MiniSearch<DocSearchEntry>>();
  private readonly entriesByLocale = new Map<string, Map<string, DocSearchEntry>>();

  search(query: string, limit = 12): DocSearchResult[] {
    if (!query.trim()) return [];

    const locale = this.localeService.locale();
    const miniSearch = this.getIndex(locale);
    const entries = this.entriesByLocale.get(locale);
    const results = miniSearch.search(query, { combineWith: 'AND' });

    return results.slice(0, limit).map((result) => {
      const id = String(result.id);
      const entry = entries?.get(id);

      return {
        id,
        title: result['title'] as string,
        category: result['category'] as string,
        route: result['route'] as string,
        fragment: result['fragment'] as string | undefined,
        snippet: this.buildSnippet(entry?.content ?? '', query),
        score: result.score,
      };
    });
  }

  private getIndex(locale: string): MiniSearch<DocSearchEntry> {
    const cached = this.indexes.get(locale);
    if (cached) return cached;

    const entries = buildEntries(this.docsService.docs(), this.docsService.navigation());
    const miniSearch = new MiniSearch<DocSearchEntry>({
      fields: ['title', 'content', 'category'],
      storeFields: ['title', 'category', 'route', 'fragment'],
      searchOptions: {
        boost: { title: 4, category: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });

    miniSearch.addAll(entries);
    this.indexes.set(locale, miniSearch);
    this.entriesByLocale.set(locale, new Map(entries.map((entry) => [entry.id, entry])));
    return miniSearch;
  }

  private buildSnippet(content: string, query: string): string {
    if (!content) return '';

    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);

    const lowerContent = content.toLowerCase();
    let index = -1;

    for (const term of terms) {
      index = lowerContent.indexOf(term);
      if (index !== -1) break;
    }

    if (index === -1) {
      return content.slice(0, 120) + (content.length > 120 ? '…' : '');
    }

    const start = Math.max(0, index - 40);
    const end = Math.min(content.length, index + 80);
    const prefix = start > 0 ? '…' : '';
    const suffix = end < content.length ? '…' : '';

    return prefix + content.slice(start, end).trim() + suffix;
  }
}
