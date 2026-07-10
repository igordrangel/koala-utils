import { RenderMode, ServerRoute } from '@angular/ssr';
import manifest from '../generated/docs-manifest.json';
import type { DocsManifest } from './core/models/docs.types';

const docsManifest = manifest as DocsManifest;

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'pt/docs',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':locale',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return docsManifest.supportedLocales.map((locale) => ({ locale }));
    },
  },
  {
    path: ':locale/docs/:category/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return docsManifest.supportedLocales.flatMap((locale) =>
        docsManifest.locales[locale].docs.map((doc) => ({
          locale,
          category: doc.category,
          slug: doc.slug,
        })),
      );
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
