import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = "https://utils.koalarx.com";
const outputDir = path.resolve('dist/site/browser');
const manifestPath = path.resolve('src/generated/docs-manifest.json');
const indexFile = path.join(outputDir, 'index.html');
const notFoundFile = path.join(outputDir, '404.html');
const sitemapFile = path.join(outputDir, 'sitemap.xml');

function buildSitemapRoutes(manifest) {
  return [
    '/',
    ...manifest.supportedLocales.flatMap((locale) => [
      `/${locale}`,
      ...manifest.locales[locale].docs.map((doc) => doc.route),
    ]),
  ];
}

function buildSitemapXml(routes) {
  const uniqueRoutes = [...new Set(routes.filter(Boolean))];
  const urls = uniqueRoutes
    .map((route) => {
      const loc = route === '/' ? SITE_URL : `${SITE_URL}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

if (!fs.existsSync(indexFile)) {
  console.error('index.html não encontrado em', outputDir);
  process.exit(1);
}

fs.copyFileSync(indexFile, notFoundFile);

for (const file of fs.readdirSync(outputDir)) {
  if (file.endsWith('.map')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  fs.writeFileSync(sitemapFile, buildSitemapXml(buildSitemapRoutes(manifest)));
  console.log(`Sitemap gerado → ${sitemapFile}`);
} else {
  console.warn('Manifest não encontrado; sitemap.xml não foi gerado.');
}

console.log('404.html gerado para GitHub Pages (SPA fallback)');
console.log('Source maps removidos do artefato de deploy');
