import { computed, inject, Injectable } from '@angular/core';
import manifest from '../../../generated/docs-manifest.json';
import type { DocPage, DocsManifest } from '../models/docs.types';
import { DEFAULT_LOCALE } from '../models/locale.types';
import { transformMarkdownLinks } from '../utils/markdown-links';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class DocsService {
  private readonly localeService = inject(LocaleService);
  private readonly data = manifest as DocsManifest;

  readonly navigation = computed(() => {
    const locale = this.localeService.locale();
    return this.data.locales[locale]?.navigation ?? this.data.locales[DEFAULT_LOCALE].navigation;
  });

  readonly docs = computed(() => {
    const locale = this.localeService.locale();
    return this.data.locales[locale]?.docs ?? this.data.locales[DEFAULT_LOCALE].docs;
  });

  findDoc(category: string, slug: string): DocPage | undefined {
    return this.docs().find((doc) => doc.category === category && doc.slug === slug);
  }

  getRenderableContent(doc: DocPage): string {
    return transformMarkdownLinks(doc.content, doc.category, doc.locale);
  }

  search(query: string) {
    const term = query.trim().toLowerCase();
    if (!term) return [];

    return this.docs()
      .filter((doc) => {
        const haystack = [doc.title, doc.description, doc.content, doc.category]
          .join(' ')
          .toLowerCase();
        return haystack.includes(term);
      })
      .slice(0, 12)
      .map((doc) => ({
        title: doc.title,
        description: doc.description,
        route: doc.route,
      }));
  }
}
