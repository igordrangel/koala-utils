import { describe, expect, it } from 'vitest';
import { transformMarkdownLinks } from './markdown-links';

describe('transformMarkdownLinks', () => {
  it('converte links .md relativos em rotas da doc', () => {
    const input = 'Veja [Rotas](./rotas.md) e [Host](../host/controllers.md).';
    const output = transformMarkdownLinks(input, 'host', 'pt');

    expect(output).toContain('[Rotas](/pt/docs/host/rotas)');
    expect(output).toContain('[Host](/pt/docs/host/controllers)');
  });

  it('converte links .md com ancora em rotas da doc', () => {
    const input =
      'Veja [Scalar](./openapi-scalar.md#autenticacao-automatica-no-scalar).';
    const output = transformMarkdownLinks(input, 'host', 'pt');

    expect(output).toContain(
      '[Scalar](/pt/docs/host/openapi-scalar#autenticacao-automatica-no-scalar)',
    );
  });

  it('preserva links externos e âncoras', () => {
    const input = '[Site](https://koalarx.com) e [Guia](/pt/docs/inicio/guia).';
    expect(transformMarkdownLinks(input, 'inicio', 'pt')).toBe(input);
  });

  it('remove o h1 duplicado do markdown', () => {
    const input = '# Título\n\nConteúdo.';
    expect(transformMarkdownLinks(input, 'intro', 'en')).toBe('Conteúdo.');
  });
});
