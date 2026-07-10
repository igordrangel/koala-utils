import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type { Locale } from '../models/locale.types';
import { absoluteSiteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '../config/site-seo';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  alternatePath?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: PageSeo) {
    const url = absoluteSiteUrl(page.path);
    const fullTitle = page.title.includes(SITE_NAME) ? page.title : `${page.title} — ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:image', content: DEFAULT_OG_IMAGE });
    this.meta.updateTag({
      property: 'og:locale',
      content: page.locale === 'pt' ? 'pt_BR' : 'en_US',
    });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: DEFAULT_OG_IMAGE });

    this.setLinkTag('canonical', url);
    this.setAlternateLinks(page.path, page.alternatePath);
  }

  private setLinkTag(rel: string, href: string) {
    const selector = `link[rel="${rel}"]`;
    let link = this.document.head.querySelector(selector) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      this.document.head.appendChild(link);
    }

    link.href = href;
  }

  private setAlternateLinks(currentPath: string, alternatePath?: string) {
    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((node) => node.remove());

    if (!alternatePath) {
      return;
    }

    const ptPath = currentPath.startsWith("/en") ? alternatePath : currentPath;
    const enPath = currentPath.startsWith("/en") ? currentPath : alternatePath;

    for (const [hreflang, href] of [
      ["pt-BR", absoluteSiteUrl(ptPath)],
      ["en", absoluteSiteUrl(enPath)],
      ["x-default", absoluteSiteUrl(ptPath)],
    ] as const) {
      const link = this.document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      this.document.head.appendChild(link);
    }
  }
}
