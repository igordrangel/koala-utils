import { describe, expect, it } from 'vitest';
import {
  buildAlternateRouteIndex,
  DEFAULT_DOCS_ROUTE_BY_LOCALE,
  resolveLocaleSwitchPath,
  swapLocaleInPath,
} from './locale-routing';

describe('swapLocaleInPath', () => {
  it('troca o locale mantendo o restante da rota', () => {
    expect(swapLocaleInPath('/pt/docs/inicio/instalacao', 'en')).toBe(
      '/en/docs/inicio/instalacao',
    );
  });
});

describe('resolveLocaleSwitchPath', () => {
  const alternateRoutes = {
    '/pt/docs/inicio/instalacao': '/en/docs/getting-started/installation',
    '/en/docs/getting-started/installation': '/pt/docs/inicio/instalacao',
  };

  it('usa alternateRoute em páginas de documentação', () => {
    expect(
      resolveLocaleSwitchPath('/pt/docs/inicio/instalacao', 'en', alternateRoutes),
    ).toBe('/en/docs/getting-started/installation');
  });

  it('volta para a rota PT equivalente', () => {
    expect(
      resolveLocaleSwitchPath('/en/docs/getting-started/installation', 'pt', alternateRoutes),
    ).toBe('/pt/docs/inicio/instalacao');
  });

  it('redireciona landing para a home do locale alvo', () => {
    expect(resolveLocaleSwitchPath('/pt', 'en', alternateRoutes)).toBe('/en');
  });

  it('faz fallback quando não há par traduzido', () => {
    expect(resolveLocaleSwitchPath('/en/docs/core/kl-string', 'pt', alternateRoutes)).toBe(
      '/pt/docs/core/kl-string',
    );
  });
});

describe('buildAlternateRouteIndex', () => {
  it('indexa rotas alternativas por rota atual', () => {
    const index = buildAlternateRouteIndex([
      {
        route: '/pt/docs/inicio/instalacao',
        alternateRoute: '/en/docs/getting-started/installation',
      },
    ]);

    expect(index['/pt/docs/inicio/instalacao']).toBe(
      '/en/docs/getting-started/installation',
    );
  });
});

describe('DEFAULT_DOCS_ROUTE_BY_LOCALE', () => {
  it('define rotas padrão por idioma', () => {
    expect(DEFAULT_DOCS_ROUTE_BY_LOCALE.pt).toBe('/pt/docs/inicio/instalacao');
    expect(DEFAULT_DOCS_ROUTE_BY_LOCALE.en).toBe('/en/docs/getting-started/installation');
  });
});
