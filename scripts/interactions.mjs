#!/usr/bin/env node
/**
 * Browser checks with Playwright (headless Chromium): layout overflow, keyboard menu, Camera Settle,
 * service preview focus, gallery filter/lightbox, client form validation, reduced motion, no-JS.
 *   BASE_URL=http://localhost:4321 node scripts/interactions.mjs
 * Requires `playwright` to be resolvable (not a project dependency).
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const PAGES = (process.env.PAGES || '/,/services,/kitchen-remodeling,/newconstruction,/commercial-contractor,/drywall-contrator,/projects,/service-areas,/illinois-construction,/about-us,/contact,/blog,/privacy,/nope').split(',');
let failed = 0;
const result = (ok, label, extra = '') => {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? '  ' + extra : ''}`);
};

const browser = await chromium.launch();

// 1. No horizontal overflow, one h1, at several widths
for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const bad = [];
  for (const p of PAGES) {
    await page.goto(BASE + p);
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
    }));
    if (r.overflow > 0 || r.h1 !== 1) bad.push(`${p} overflow=${r.overflow} h1=${r.h1}`);
  }
  result(bad.length === 0, `no sideways scroll and exactly one h1 at ${width}px`, bad.join('; '));
  await page.close();
}

// 2. Camera Settle: starts offset, ends at rest, transform only
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/');
  const first = await page.evaluate(() => getComputedStyle(document.querySelector('[data-settle]')).transform);
  await page.waitForTimeout(1600);
  const end = await page.evaluate(() => ({
    t: getComputedStyle(document.querySelector('[data-settle]')).transform,
    pending: document.documentElement.classList.contains('settle-pending'),
    anims: document.querySelector('[data-settle]').getAnimations().length,
  }));
  result(end.t === 'none' && !end.pending && end.anims === 0, 'Camera Settle finishes at rest and stops', `start=${first} end=${end.t}`);
  // Second visit in the same session does not replay
  await page.goto(BASE + '/');
  const again = await page.evaluate(() => document.documentElement.classList.contains('settle-pending'));
  result(!again, 'Camera Settle does not replay in the same session');
  await page.close();
}
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  const t = await page.evaluate(() => getComputedStyle(document.querySelector('[data-settle]')).transform);
  result(t === 'none', 'reduced motion: photo shown at rest immediately');
  await ctx.close();
}
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  const r = await page.evaluate(() => ({
    t: getComputedStyle(document.querySelector('[data-settle]')).transform,
    img: !!document.querySelector('[data-settle] img'),
  }));
  result(r.t === 'none' && r.img, 'no JavaScript: photo shown at rest, real <img> present');
  await page.goto(BASE + '/projects');
  const imgs = await page.locator('.gallery img').count();
  result(imgs >= 5, 'no JavaScript: gallery photos visible', `${imgs} images`);
  await ctx.close();
}

// 3. Mobile menu: keyboard open, focus inside, Escape closes and returns focus
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE + '/');
  await page.focus('.menu-toggle');
  await page.keyboard.press('Enter');
  const open = await page.evaluate(() => ({
    expanded: document.querySelector('.menu-toggle').getAttribute('aria-expanded'),
    visible: !document.getElementById('mobile-menu').hidden,
    focusIn: document.getElementById('mobile-menu').contains(document.activeElement),
  }));
  await page.keyboard.press('Escape');
  const closed = await page.evaluate(() => ({
    hidden: document.getElementById('mobile-menu').hidden,
    focusBack: document.activeElement === document.querySelector('.menu-toggle'),
  }));
  result(open.expanded === 'true' && open.visible && open.focusIn && closed.hidden && closed.focusBack, 'mobile menu: keyboard open, focus moves in, Escape closes and returns focus');
  await page.close();
}

// 4. Service preview responds to keyboard focus
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/');
  await page.focus('[data-svc="bathrooms"]');
  await page.waitForTimeout(100);
  const r = await page.evaluate(() => ({
    active: document.querySelector('[data-slide].is-active')?.dataset.slide,
    caption: document.querySelector('[data-svc-caption]').textContent,
    img: !!document.querySelector('[data-slide="bathrooms"] img'),
  }));
  result(r.active === 'bathrooms' && r.img && /Bathroom/.test(r.caption), 'service preview follows keyboard focus', r.caption);
  await page.close();
}

// 5. Gallery: filter, lightbox open, arrow keys, Escape, focus return
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/projects');
  await page.click('[data-filter="kitchens"]');
  const shown = await page.locator('.gallery > li:not([hidden])').count();
  result(shown === 2, 'gallery filter shows only matching photos', `${shown} kitchen photos`);
  await page.click('[data-filter="all"]');
  const btn = page.locator('[data-open]').first();
  await btn.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(150);
  const o = await page.evaluate(() => ({ open: document.querySelector('[data-lightbox]').open, cap: document.querySelector('[data-lb-caption]').textContent }));
  await page.keyboard.press('ArrowRight');
  const c2 = await page.evaluate(() => document.querySelector('[data-lb-count]').textContent);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
  const after = await page.evaluate(() => ({ open: document.querySelector('[data-lightbox]').open, focus: document.activeElement?.dataset.open }));
  result(o.open && c2.startsWith('2 of') && !after.open && after.focus === '0', 'lightbox: opens, arrow keys move, Escape closes, focus returns', `${o.cap} / ${c2}`);
  await page.close();
  const page2 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page2.goto(BASE + '/projects#bathrooms');
  const fromHash = await page2.locator('.gallery > li:not([hidden])').count();
  result(fromHash === 1, 'gallery honours #category links from the home page', `${fromHash} shown`);
  await page2.close();
}

// 6. Form: client validation, error summary focus, preselect, honest not-sent state
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/contact?service=kitchens&topic=kitchens');
  const pre = await page.evaluate(() => ({
    svc: document.querySelector('#contact-service').value,
    topic: document.querySelector('[data-topic-note]').hidden ? '' : document.querySelector('[data-topic-note]').textContent,
  }));
  result(pre.svc === 'kitchens' && /Kitchens/.test(pre.topic), 'service page context preselects the form', pre.topic);
  await page.click('#contact-form [data-submit], form [data-submit]');
  const v = await page.evaluate(() => ({
    summaryShown: !document.querySelector('[data-summary]').hidden,
    focused: document.activeElement === document.querySelector('[data-summary]'),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.name),
  }));
  result(v.summaryShown && v.focused && v.invalid.includes('name') && v.invalid.includes('email'), 'empty submit: error summary shown and focused, fields marked invalid', v.invalid.join(','));
  await page.fill('#contact-name', 'Test Person');
  await page.fill('#contact-phone', '219-555-0123');
  await page.fill('#contact-location', 'Dyer');
  await page.fill('#contact-description', 'Looking to redo a hall bathroom.');
  await page.waitForTimeout(2600); // minimum fill time
  await page.click('form [data-submit]');
  await page.waitForSelector('[data-status]:not([hidden])', { timeout: 10_000 }).catch(() => {});
  const s = await page.evaluate(() => ({
    text: document.querySelector('[data-status]').textContent,
    kept: document.querySelector('#contact-name').value,
  }));
  result(/Not sent/.test(s.text) && /219-433-4846/.test(s.text) && s.kept === 'Test Person', 'unconfigured delivery: honest "Not sent" with phone/email, input preserved', s.text.slice(0, 90) + ' / invalid: ' + (await page.evaluate(() => [...document.querySelectorAll('[aria-invalid]')].map((e) => e.name + ':' + e.value).join(','))));
  await page.close();
}

// 7. Status codes
{
  const page = await browser.newPage();
  const r404 = await page.goto(BASE + '/definitely-not-a-page');
  result(r404.status() === 404, 'unknown path returns 404 with custom page');
  await page.close();
}

await browser.close();
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exitCode = failed ? 1 : 0;
