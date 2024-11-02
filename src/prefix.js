import { stat } from 'fs/promises';

const DEFAULT_SCRIPT_RUNNER = process.env.DEFAULT_SCRIPT_RUNNER || 'npm';

const fileExists = async path => !!(await stat(path).catch(e => false));


export const PrefixPerPackageManager = {
  npm: 'npm run',
  yarn: 'yarn',
  bun: 'bun',
  deno: 'deno run',
  pnpm: 'pnpm run',
};

async function getPackageManager() {
  const packageManager = await Promise.all([
    fileExists('package-lock.json').then(exists => exists ? 'npm' : null),
    fileExists('yarn.lock').then(exists => exists ? 'yarn' : null),
    fileExists('bun.lockb').then(exists => exists ? 'bun' : null),
    fileExists('deps.ts').then(exists => exists ? 'deno' : null),
    fileExists('deno.lock').then(exists => exists ? 'deno' : null),
    fileExists('pnpm-lock.yaml').then(exists => exists ? 'pnpm' : null),
  ]);

  return packageManager.find(Boolean) || DEFAULT_SCRIPT_RUNNER;
}

export async function getScriptPrefix() {
  const packageManager = await getPackageManager();
  return PrefixPerPackageManager[packageManager];
}