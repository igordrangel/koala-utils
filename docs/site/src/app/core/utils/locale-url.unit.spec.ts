import { describe, expect, it } from 'vitest';
import { isDocsUrl, isLandingUrl, parseLocaleFromUrl } from './locale-url';

describe('parseLocaleFromUrl', () => {
  it('extrai pt e en da primeira rota', () => {
    expect(parseLocaleFromUrl('/pt/docs/inicio/guia')).toBe('pt');
    expect(parseLocaleFromUrl('/en')).toBe('en');
  });

  it('usa pt como fallback', () => {
    expect(parseLocaleFromUrl('/')).toBe('pt');
    expect(parseLocaleFromUrl('/docs/foo')).toBe('pt');
  });

  it('ignora query e hash', () => {
    expect(parseLocaleFromUrl('/en/docs?x=1#intro')).toBe('en');
  });
});

describe('isLandingUrl', () => {
  it('identifica landing pt/en', () => {
    expect(isLandingUrl('/pt')).toBe(true);
    expect(isLandingUrl('/en')).toBe(true);
    expect(isLandingUrl('/pt/docs')).toBe(false);
  });
});

describe('isDocsUrl', () => {
  it('identifica rotas de documentação', () => {
    expect(isDocsUrl('/pt/docs')).toBe(true);
    expect(isDocsUrl('/en/docs/host/rotas')).toBe(true);
    expect(isDocsUrl('/pt')).toBe(false);
  });
});
