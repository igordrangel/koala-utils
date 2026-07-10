import { describe, expect, it } from 'vitest';
import { SearchService } from '../services/search.service';

describe('SearchService', () => {
  it('abre e fecha o diálogo de busca', () => {
    const service = new SearchService();

    expect(service.open()).toBe(false);

    service.show();
    expect(service.open()).toBe(true);

    service.hide();
    expect(service.open()).toBe(false);
  });
});
