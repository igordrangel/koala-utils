import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { APP_VERSION } from './app-version';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../../../../../../',
);

describe('APP_VERSION', () => {
  it('reflete a versão publicada da CLI no package.json raiz', () => {
    const rootPackage = JSON.parse(
      readFileSync(path.join(repoRoot, 'package.json'), 'utf8'),
    ) as { version: string };

    expect(APP_VERSION).toBe(rootPackage.version);
  });
});
