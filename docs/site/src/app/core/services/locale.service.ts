import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import manifest from '../../../generated/docs-manifest.json';
import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES } from '../models/locale.types';
import type { DocsManifest } from '../models/docs.types';
import {
  buildAlternateRouteIndex,
  DEFAULT_DOCS_ROUTE_BY_LOCALE,
  resolveLocaleSwitchPath,
} from '../utils/locale-routing';
import { isDocsUrl, isLandingUrl, parseLocaleFromUrl } from '../utils/locale-url';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);
  private readonly alternateRoutes = buildAlternateRouteIndex(
    Object.values((manifest as DocsManifest).locales).flatMap((locale) => locale.docs),
  );

  readonly supportedLocales = SUPPORTED_LOCALES;
  readonly defaultLocale = DEFAULT_LOCALE;

  readonly locale = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.parseLocale(this.router.url)),
      startWith(this.parseLocale(this.router.url)),
    ),
    { initialValue: this.parseLocale(this.router.url) },
  );

  parseLocale(url: string): Locale {
    return parseLocaleFromUrl(url);
  }

  isLandingUrl(url: string) {
    return isLandingUrl(url);
  }

  isDocsUrl(url: string) {
    return isDocsUrl(url);
  }

  homeRoute(locale = this.locale()) {
    return `/${locale}`;
  }

  docsRootRoute(locale = this.locale()) {
    return `/${locale}/docs`;
  }

  defaultDocsRoute(locale = this.locale()) {
    return DEFAULT_DOCS_ROUTE_BY_LOCALE[locale];
  }

  docsRoute(category: string, slug: string, locale = this.locale()) {
    return `/${locale}/docs/${category}/${slug}`;
  }

  llmsFile(locale = this.locale()) {
    return locale === 'pt' ? '/llms.txt' : `/llms-${locale}.txt`;
  }

  switchLocalePath(target: Locale): string {
    const path = this.router.url.split('?')[0].split('#')[0];
    return resolveLocaleSwitchPath(path, target, this.alternateRoutes);
  }
}
