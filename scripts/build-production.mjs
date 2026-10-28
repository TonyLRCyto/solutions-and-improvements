/** Build the production configuration on Windows, macOS and Linux. */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const pkg = new URL('../node_modules/astro/package.json', import.meta.url);
const { bin } = JSON.parse(readFileSync(pkg, 'utf8'));
const cli = fileURLToPath(new URL(typeof bin === 'string' ? bin : bin.astro, pkg));
const result = spawnSync(process.execPath, [cli, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_MODE: 'production', CLOUDFLARE_ENV: 'production' },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
