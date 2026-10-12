// End-to-end browser tests (WEDE5020 Part 3): search, sorting, validation, AJAX and mobile layout.
// Needs: npm install playwright, then npx playwright install chromium.
// Serve the site first (python -m http.server 8765) and run: node tests/e2e.test.js
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'http://localhost:8765/';
let pass = 0, fail = 0;
const ok = (name, cond, extra) => { if (cond) { pass++; console.log('PASS', name); } else { fail++; console.log('FAIL', name, extra || ''); } };
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  async function open(path, tweak) {
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(path + ': ' + e.message));
    if (tweak) await tweak(page);
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
    return page;
  }

  // ---- Services dynamic content, search, filter, sort
  let p = await open('services.html');
  await p.waitForSelector('.catalog-card');
  ok('services: 4 cards load dynamically', await p.locator('.catalog-card').count() === 4);
  ok('services: count text', (await p.locator('[data-role=count]').innerText()).includes('Showing 4 of 4'));
  await p.fill('#services-search', 'workshop'); await p.waitForTimeout(300);
  ok('services: search "workshop" gives 1', await p.locator('.catalog-card').count() === 1);
  await p.fill('#services-search', 'zzzz'); await p.waitForTimeout(300);
  ok('services: no-results message', (await p.locator('.catalog-empty').count()) === 1);
  await p.click('[data-role=reset]'); await p.waitForTimeout(100);
  ok('services: reset restores 4', await p.locator('.catalog-card').count() === 4);
  await p.selectOption('#services-category', 'Funding');
  ok('services: category Funding gives 1', await p.locator('.catalog-card').count() === 1);
  await p.selectOption('#services-category', 'all'); await p.selectOption('#services-sort', 'za');
  ok('services: sort Z-A first card', (await p.locator('.catalog-card h3').first().innerText()) === 'Fundraising Assistance' || (await p.locator('.catalog-card h3').first().innerText()) === 'Fundraising Assistance'.trim());
  const href = await p.locator('.catalog-link').first().getAttribute('href');
  ok('services: enquire link has type', href.startsWith('enquiry.html?type=services&item='), href);
  await p.screenshot({ path: 'test-screenshot.png', fullPage: false });
  p = await open('projects.html'); await p.waitForSelector('.catalog-card');
  ok('projects: 5 cards', await p.locator('.catalog-card').count() === 5);
  await p.fill('#projects-search', 'tree'); await p.waitForTimeout(300);
  ok('projects: search tree gives Green Future', (await p.locator('.catalog-card h3').allInnerTexts()).join() === 'Green Future');

  // ---- Contact form validation
  p = await open('contact.html');
  await p.click('button[type=submit]');
  ok('contact: empty submit shows error summary', (await p.locator('.form-status').innerText()).includes('highlighted'));
  ok('contact: required errors visible', (await p.locator('.field-error:not(:empty)').count()) >= 5);
  await p.fill('#name', 'T4'); await p.fill('#email', 'bad'); await p.fill('#phone', '123'); await p.fill('#subject', 'Hi'); await p.fill('#message', 'short');
  await p.click('button[type=submit]');
  const errs = (await p.locator('.field-error').allInnerTexts()).join(' | ');
  ok('contact: name/email/phone/subject/message errors', errs.includes('letters') && errs.includes('valid email') && errs.includes('South African') && errs.includes('at least 5') && errs.includes('at least 20'), errs);
  ok('contact: first invalid field focused', await p.evaluate(() => document.activeElement.id) === 'name');
  await p.fill('#name', 'Thabo Mokoena'); await p.fill('#email', 'thabo@example.com'); await p.fill('#phone', '073 123 4567');
  await p.selectOption('#type', 'feedback'); await p.fill('#subject', 'Great work'); await p.fill('#message', 'I love what you do for the community.');
  await p.check('#consent');
  await p.click('button[type=submit]');
  await p.waitForSelector('.form-status-success', { timeout: 5000 });
  const st = await p.locator('.form-status').innerText();
  ok('contact: demo success shown', st.includes('Thank you, Thabo') && st.includes('Demo mode'), st);
  const pre = await p.locator('.form-status pre').textContent();
  ok('contact: email compiled to recipient', pre.includes('Name: Thabo Mokoena') && pre.includes('Type: Feedback') && pre.includes('Subject: [Hope Connect Website]'), pre);
  ok('contact: form reset after success', (await p.inputValue('#name')) === '');
  ok('contact: button restored', (await p.locator('button[type=submit]').innerText()).includes('Send Message'));

  // ---- Enquiry form with preselected type, date rules and cost/availability response
  p = await open('enquiry.html?type=services&item=educational-workshops');
  ok('enquiry: type preselected from link', (await p.inputValue('#type')) === 'services');
  ok('enquiry: subject prefilled', (await p.inputValue('#subject')) === 'Enquiry about educational workshops');
  await p.fill('#name', 'Sipho Dlamini'); await p.fill('#email', 'sipho@example.com'); await p.fill('#phone', '+27 82 555 1234');
  await p.fill('#date', '2020-01-01'); await p.fill('#message', 'Please send me details about the workshops for our school.'); await p.check('#consent');
  await p.click('button[type=submit]');
  ok('enquiry: past date rejected', (await p.locator('#date-error').innerText()).includes('future'), await p.locator('#date-error').innerText());
  // next Sunday
  const sunday = await p.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); return d.toISOString().slice(0, 10); });
  await p.fill('#date', sunday); await p.click('button[type=submit]');
  await p.waitForSelector('.form-status-success');
  const er = await p.locator('.form-status').innerText();
  ok('enquiry: response shows cost and Sunday availability', er.includes('R350') && er.includes('Sundays'), er);
  // honeypot
  await p.fill('#name', 'Bot Bot'); await p.evaluate(() => { document.getElementById('website').value = 'spam'; });
  await p.click('button[type=submit]', { force: true });
  ok('enquiry: honeypot blocks bots silently', (await p.inputValue('#name')) === '' );

  // ---- AJAX path: configured endpoint gets a JSON POST; failure shows email fallback
  const cfg = async page => page.route('**/js/forms.js', async route => {
    const resp = await route.fetch(); let body = await resp.text();
    await route.fulfill({ response: resp, body: body.replace('YOUR_FORM_ID', 'abc123') });
  });
  let posted = null;
  p = await open('enquiry.html', async page => { await cfg(page); await page.route('https://formspree.io/f/abc123', async route => { posted = route.request().postDataJSON(); await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); }); });
  await p.fill('#name', 'Lerato Nkosi'); await p.fill('#email', 'lerato@example.com'); await p.fill('#phone', '0612345678'); await p.selectOption('#type', 'sponsorship');
  await p.fill('#subject', 'Monthly sponsorship'); await p.fill('#message', 'I would like to sponsor a project every month.'); await p.check('#consent');
  const navs = []; p.on('framenavigated', f => navs.push(f.url()));
  await p.click('button[type=submit]'); await p.waitForSelector('.form-status-success');
  ok('ajax: JSON POST sent to endpoint', posted && posted.name === 'Lerato Nkosi' && posted.recipient === 'contact@hopeconnectfoundation.org' && posted._subject.includes('Enquiry') && posted.emailBody.includes('Monthly sponsorship'), JSON.stringify(posted));
  ok('ajax: no demo note when configured', !(await p.locator('.form-status').innerText()).includes('Demo mode'));
  ok('ajax: no page reload', navs.length === 0, navs.join());
  ok('ajax: sponsorship cost in response', (await p.locator('.form-status').innerText()).includes('R500'));
  p = await open('contact.html', async page => { await cfg(page); await page.route('https://formspree.io/f/abc123', route => route.fulfill({ status: 500, body: 'error' })); });
  await p.fill('#name', 'Lerato Nkosi'); await p.fill('#email', 'lerato@example.com'); await p.selectOption('#type', 'general');
  await p.fill('#subject', 'Testing failure'); await p.fill('#message', 'This submission should fail with a friendly message.'); await p.check('#consent');
  await p.click('button[type=submit]'); await p.waitForSelector('.form-status-error');
  const mail = await p.locator('.form-status a').getAttribute('href');
  ok('ajax failure: friendly error with mailto fallback', mail.startsWith('mailto:contact@hopeconnectfoundation.org?subject=') && (await p.inputValue('#name')) === 'Lerato Nkosi', mail);
  ok('ajax failure: button re-enabled', await p.locator('button[type=submit]').isEnabled());

  // ---- Volunteer form
  p = await open('get-involved.html');
  await p.click('#volunteerForm button[type=submit]');
  ok('volunteer: validation errors', (await p.locator('#volunteerForm .field-error:not(:empty)').count()) === 3);
  await p.fill('#name', 'Anele Zulu'); await p.fill('#email', 'anele@example.com'); await p.selectOption('#activity', 'tree_planting');
  await p.click('#volunteerForm button[type=submit]'); await p.waitForSelector('.form-status-success');
  ok('volunteer: success', (await p.locator('.form-status').innerText()).includes('volunteer sign-up'));

  // ---- Responsive: no horizontal scroll at 375px, nav present
  const m = await browser.newContext({ viewport: { width: 375, height: 800 } });
  for (const f of ['index.html','about.html','services.html','projects.html','get-involved.html','gallery.html','contact.html','enquiry.html']) {
    const mp = await m.newPage(); await mp.goto(BASE + f, { waitUntil: 'load' }); await mp.waitForTimeout(250);
    const w = await mp.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    ok('mobile 375px no horizontal scroll: ' + f, w.sw <= w.iw + 1, JSON.stringify(w));
    if (f === 'enquiry.html') await mp.screenshot({ path: 'test-screenshot.png', fullPage: true });
    await mp.close();
  }
  p = await open('enquiry.html'); await p.screenshot({ path: 'test-screenshot.png', fullPage: true });
  ok('no uncaught JS errors', errors.length === 0, errors.join(' || '));
  console.log(`\n${pass} passed, ${fail} failed`);
  await browser.close();
})();
