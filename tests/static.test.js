// Static checks for the Hope Connect Foundation Part 3 website.
// Run: node tests/static.test.js
// No external packages are required.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
let passed = 0, failed = 0, warnings = 0;
function ok(name, condition, detail = '') {
  if (condition) { passed++; console.log('PASS ' + name); }
  else { failed++; console.log('FAIL ' + name + (detail ? ' — ' + detail : '')); }
}
function warn(name, condition, detail = '') {
  if (!condition) { warnings++; console.log('WARN ' + name + (detail ? ' — ' + detail : '')); }
}
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8'); }
function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)) out[m[1].toLowerCase()] = m[2];
  return out;
}
function localTarget(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return null;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(href)) return null;
  return href.split('#')[0].split('?')[0];
}

// Page-level metadata and one page-specific h1.
const titles = new Map();
const descriptions = new Map();
for (const file of htmlFiles) {
  const html = read(file);
  ok(`${file}: lang attribute`, /<html\b[^>]*\blang=["']en-ZA["']/i.test(html));
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [,''])[1].trim();
  const desc = (html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [,''])[1].trim();
  ok(`${file}: title exists and is <= 70 chars`, !!title && title.length <= 70);
  ok(`${file}: meta description exists and is <= 160 chars`, !!desc && desc.length <= 160);
  titles.set(title, (titles.get(title) || 0) + 1);
  descriptions.set(desc, (descriptions.get(desc) || 0) + 1);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  ok(`${file}: exactly one h1`, h1s.length === 1);
  if (file !== '404.html') {
    ok(`${file}: canonical link`, /<link\b[^>]*rel=["']canonical["']/i.test(html));
    ok(`${file}: Open Graph image`, /property=["']og:image["']/i.test(html));
  }
  ok(`${file}: favicon`, /rel=["'][^"']*icon[^"']*["'][^>]*href=["']favicon\.svg["']/i.test(html));
  ok(`${file}: Font Awesome 6.5.2`, /font-awesome\/6\.5\.2\/css\/all\.min\.css/i.test(html));
  // Every local image has alt text.
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    ok(`${file}: image has alt (${a.src || 'unknown'})`, Object.prototype.hasOwnProperty.call(a, 'alt'));
  }
  // Form controls have labels or an accessible name.
  for (const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const a = attrs(m[0]);
    if (a.type === 'hidden') continue;
    const id = a.id;
    const labelled = id && new RegExp(`<label\\b[^>]*\\bfor=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(html);
    const accessible = !!a['aria-label'] || !!a['aria-labelledby'];
    ok(`${file}: form control has accessible label (${id || a.name || a.type || 'control'})`, labelled || accessible);
  }
  // Duplicate IDs.
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map(m => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  ok(`${file}: no duplicate IDs`, dup.length === 0, dup.join(', '));
  // Local href/src references.
  for (const m of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(m[1]);
    if (!target || target.endsWith('/') || target.startsWith('data:')) continue;
    ok(`${file}: local reference exists (${target})`, fs.existsSync(path.join(root, target)));
  }
  // srcset candidates.
  for (const m of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of m[1].split(',').map(x => x.trim()).filter(Boolean)) {
      const target = candidate.split(/\s+/)[0];
      const local = localTarget(target);
      if (local) ok(`${file}: srcset file exists (${local})`, fs.existsSync(path.join(root, local)));
    }
  }
}

for (const [value, count] of titles) ok(`unique title: ${value}`, value && count === 1, `count=${count}`);
for (const [value, count] of descriptions) ok(`unique description: ${value.slice(0, 60)}`, value && count === 1, `count=${count}`);

const indexable = htmlFiles.filter(f => f !== '404.html');
const sitemap = read('sitemap.xml');
for (const file of indexable) ok(`sitemap includes ${file}`, sitemap.includes(`/${file}`) || (file === 'index.html' && sitemap.includes('<loc>')));
ok('sitemap excludes 404.html', !sitemap.includes('404.html'));
const robots = read('robots.txt');
ok('robots.txt exists and points to sitemap', /Sitemap:/i.test(robots) && /sitemap\.xml/i.test(robots));

// Documentation consistency checks.
const readme = read('README.md');
ok('README documents the Part 2 feedback response log', /Part 2 Feedback Response Log/i.test(readme));
ok('README documents the Part 3 changelog', /13\. Changelog/i.test(readme));
ok('README clearly states form demo mode', /demo mode/i.test(readme));
ok('README does not claim Playwright was completed', /Not run in this environment/i.test(readme));
warn('Live Formspree endpoint configured', !read('js/forms.js').includes('YOUR_FORM_ID'), 'Demo endpoint remains intentionally unconfigured.');
warn('Real image licences confirmed', !/licence or permission/i.test(readme), 'Review image permissions before public launch.');

console.log(`\n${passed} passed, ${failed} failed, ${warnings} warnings`);
process.exit(failed ? 1 : 0);
