import { expect, test } from '@playwright/test';

test('redireciona / para landing em português', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/pt$/);
  await expect(page.locator('h1')).toBeVisible();
});

test('landing em inglês carrega', async ({ page }) => {
  await page.goto('/en');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('h1')).toBeVisible();
});

test('abre página de documentação em português', async ({ page }) => {
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await expect(page.locator('h1')).toContainText(/instala/i);
});

test('abre página de documentação em inglês', async ({ page }) => {
  await page.goto('/en/docs/getting-started/installation-guide');
  await expect(page.locator('h1')).toContainText(/installation/i);
});

test('menu mobile navega para outra página de documentação', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.locator('app-site-header aside app-docs-sidebar a').filter({ hasText: 'Visão geral' }).click();
  await expect(page).toHaveURL(/\/pt\/docs\/intro\/visao-geral$/);
});

test('oculta sidebar desktop em viewport mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await expect(page.locator('div.fixed.hidden.lg\\:block')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('oculta OnThisPage em viewport mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await expect(page.locator('app-doc-on-this-page aside')).toHaveCount(0);
});

test('oculta OnThisPage em viewport tablet (1024px)', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await expect(page.locator('app-doc-on-this-page aside')).toHaveCount(0);
});

test('exibe OnThisPage em desktop largo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao');
  await expect(page.locator('app-doc-on-this-page aside')).toBeVisible();
  await expect(page.getByText('Nesta página', { exact: true })).toBeVisible();
});

test('scroll por âncora funciona no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pt/docs/inicio/guia-de-instalacao#forma-rapida-usando-a-cli');
  await expect(page.locator('#forma-rapida-usando-a-cli')).toBeInViewport();
});

test('expõe llms.txt e markdown estático', async ({ request }) => {
  const llms = await request.get('/llms.txt');
  expect(llms.ok()).toBeTruthy();
  expect(await llms.text()).toContain('Koala Nest');

  const md = await request.get('/markdown/pt/inicio/guia-de-instalacao.md');
  expect(md.ok()).toBeTruthy();
  expect(await md.text()).toContain('---');
});
