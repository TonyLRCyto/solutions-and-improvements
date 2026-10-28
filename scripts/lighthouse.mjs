#!/usr/bin/env node
/**
 * Lighthouse runner for the representative templates.
 *
 *   BASE_URL=http://localhost:4321 RUNS=3 CHROME_PATH=/path/to/chrome node scripts/lighthouse.mjs [label]
 *
 * Runs every page RUNS times on mobile and desktop presets, saves each JSON report (and the median run's
 * HTML report) under reports/lighthouse/<label>/, and writes summary.md with median scores.
 * Uses npm exec with Lighthouse 13.6.0 (downloaded on first use), or LIGHTHOUSE_CLI_PATH,
 * and a local Chrome/Chromium. Invoke through `npm run lighthouse` for Windows support.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, renameSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

function lighthouseRunner() {
  const cli = process.env.LIGHTHOUSE_CLI_PATH;
  if (cli) {
    if (!existsSync(cli)) throw new Error(`LIGHTHOUSE_CLI_PATH does not exist: ${cli}`);
    return { file: process.execPath, args: [cli] };
  }
  const npmCli = process.env.npm_execpath;
  if (npmCli) {
    return {
      file: process.execPath,
      args: [npmCli, 'exec', '--yes', '--package=lighthouse@13.6.0', '--', 'lighthouse'],
    };
  }
  if (process.platform !== 'win32') return { file: 'npx', args: ['-y', 'lighthouse@13.6.0'] };
  throw new Error(
    'On Windows, run this through "npm run lighthouse -- <label>" or set LIGHTHOUSE_CLI_PATH ' +
    'to the installed Lighthouse 13.6.0 CLI JavaScript file, then retry. No .cmd shell wrapper is used.',
  );
}

const runner = lighthouseRunner();
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const RUNS = Number(process.env.RUNS || 3);
const label = process.argv[2] || new Date().toISOString().slice(0, 10);
const pages = (process.env.PAGES ||
  '/,/kitchen-remodeling,/projects,/illinois-construction,/commercial-contractor,/contact').split(',');
const out = join('reports', 'lighthouse', label);
mkdirSync(out, { recursive: true });
const cats = ['performance', 'accessibility', 'best-practices', 'seo'];
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

const rows = [];
let version = '';
for (const formFactor of ['mobile', 'desktop']) {
  for (const page of pages) {
    const name = `${formFactor}${page === '/' ? '-home' : page.replace(/\//g, '-')}`;
    const runs = [];
    for (let i = 1; i <= RUNS; i++) {
      const base = join(out, `${name}-run${i}`);
      const args = [
        BASE + page,
        '--quiet', '--output=json', '--output=html', `--output-path=${base}`,
        '--chrome-flags=--headless=new',
        `--only-categories=${cats.join(',')}`,
      ];
      if (formFactor === 'desktop') args.push('--preset=desktop');
      execFileSync(runner.file, [...runner.args, ...args], { stdio: 'inherit' });
      const json = JSON.parse(readFileSync(`${base}.report.json`, 'utf8'));
      version = json.lighthouseVersion;
      runs.push({
        i,
        base,
        scores: Object.fromEntries(cats.map((c) => [c, Math.round((json.categories[c]?.score ?? 0) * 100)])),
        lcp: json.audits['largest-contentful-paint']?.numericValue,
        cls: json.audits['cumulative-layout-shift']?.numericValue,
        tbt: json.audits['total-blocking-time']?.numericValue,
      });
    }
    const perfMedian = median(runs.map((r) => r.scores.performance));
    const mid = runs.find((r) => r.scores.performance === perfMedian);
    // Keep the median run's HTML report; drop the other HTML files to save space.
    for (const r of runs) {
      if (r !== mid && existsSync(`${r.base}.report.html`)) rmSync(`${r.base}.report.html`);
    }
    renameSync(`${mid.base}.report.html`, join(out, `${name}-median.report.html`));
    rows.push({
      formFactor,
      page,
      ...Object.fromEntries(cats.map((c) => [c, median(runs.map((r) => r.scores[c]))])),
      perfRuns: runs.map((r) => r.scores.performance).join('/'),
      lcp: Math.round(median(runs.map((r) => r.lcp))),
      cls: median(runs.map((r) => r.cls)).toFixed(3),
      tbt: Math.round(median(runs.map((r) => r.tbt))),
    });
  }
}

const md = [
  `# Lighthouse summary: ${label}`,
  '',
  `- Tool: Lighthouse ${version} (CLI, default throttling: simulated mobile / desktop preset)`,
  `- Base URL: ${BASE}`,
  `- Runs per page and form factor: ${RUNS}; table shows the median of each metric`,
  `- Date: ${new Date().toISOString()}`,
  '',
  '| Form factor | Page | Perf | A11y | Best pr. | SEO | Perf runs | LCP ms | CLS | TBT ms |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((r) => `| ${r.formFactor} | ${r.page} | ${r.performance} | ${r.accessibility} | ${r['best-practices']} | ${r.seo} | ${r.perfRuns} | ${r.lcp} | ${r.cls} | ${r.tbt} |`),
  '',
].join('\n');
writeFileSync(join(out, 'summary.md'), md);
console.log(md);
