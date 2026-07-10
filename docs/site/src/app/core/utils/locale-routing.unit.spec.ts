import { describe, expect, it } from 'vitest';
import {
  buildAlternateRouteIndex,
  DEFAULT_DOCS_ROUTE_BY_LOCALE,
  resolveLocaleSwitchPath,
  swapLocaleInPath,
} from './locale-routing';

describe('swapLocaleInPath', () => {
  it('troca o locale mantendo o restante da rota', () => {
    expect(swapLocaleInPath('/pt/docs/inicio/guia-de-instalacao', 'en')).toBe(
      '/en/docs/inicio/guia-de-instalacao',
    );
  });
});

describe('resolveLocaleSwitchPath', () => {
  const alternateRoutes = {
    '/pt/docs/inicio/guia-de-instalacao': '/en/docs/getting-started/installation-guide',
    '/en/docs/getting-started/installation-guide': '/pt/docs/inicio/guia-de-instalacao',
  };

  it('usa alternateRoute em páginas de documentação', () => {
    expect(
      resolveLocaleSwitchPath('/pt/docs/inicio/guia-de-instalacao', 'en', alternateRoutes),
    ).toBe('/en/docs/getting-started/installation-guide');
  });

  it('volta para a rota PT equivalente', () => {
    expect(
      resolveLocaleSwitchPath('/en/docs/getting-started/installation-guide', 'pt', alternateRoutes),
    ).toBe('/pt/docs/inicio/guia-de-instalacao');
  });

  it('redireciona landing para a home do locale alvo', () => {
    expect(resolveLocaleSwitchPath('/pt', 'en', alternateRoutes)).toBe('/en');
  });

  it('faz fallback quando não há par traduzido', () => {
    expect(resolveLocaleSwitchPath('/en/docs/host/routes', 'pt', alternateRoutes)).toBe(
      '/pt/docs/host/routes',
    );
  });
});

describe('buildAlternateRouteIndex', () => {
  it('indexa rotas alternativas por rota atual', () => {
    const index = buildAlternateRouteIndex([
      {
        route: '/pt/docs/inicio/guia-de-instalacao',
        alternateRoute: '/en/docs/getting-started/installation-guide',
      },
    ]);

    expect(index['/pt/docs/inicio/guia-de-instalacao']).toBe(
      '/en/docs/getting-started/installation-guide',
    );
  });
});

describe('DEFAULT_DOCS_ROUTE_BY_LOCALE', () => {
  it('define rotas padrão por idioma', () => {
    expect(DEFAULT_DOCS_ROUTE_BY_LOCALE.pt).toBe('/pt/docs/inicio/guia-de-instalacao');
    expect(DEFAULT_DOCS_ROUTE_BY_LOCALE.en).toBe(
      '/en/docs/getting-started/installation-guide',
    );
  });
});
