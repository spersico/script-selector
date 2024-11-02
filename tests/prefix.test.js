import { describe, it, expect, vi, afterEach } from 'vitest';
import { getScriptPrefix, PrefixPerPackageManager } from '../src/prefix.js';
import { stat } from 'fs/promises';

vi.mock('fs/promises');

describe('getScriptPrefix', () => {
  beforeEach(() => {
    stat.mockImplementation(async () => true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function mockStat(falsyCount = 0) {
    while (falsyCount--) {
      stat.mockResolvedValueOnce(false);
    }
    stat.mockResolvedValueOnce(true);
  }

  it('should return npm if package-lock.json exists', async () => {
    mockStat(0);
    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['npm']);
  });

  it('should return yarn if yarn.lock exists', async () => {
    mockStat(1);
    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['yarn']);
  });

  it('should return bun if bun.lockb exists', async () => {
    mockStat(2);
    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['bun']);
  });

  it('should return deno if deps.ts or deno.lock exists', async () => {
    mockStat(3);

    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['deno']);
  });
  it('should return deno if deps.ts or deno.lock exists', async () => {
    mockStat(4);

    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['deno']);
  });

  it('should return pnpm if pnpm-lock.yaml exists', async () => {
    mockStat(5);
    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager['pnpm']);
  });

  it('should return default script runner if no lock files exist', async () => {
    stat.mockResolvedValue(false);
    const packageManager = await getScriptPrefix();
    expect(packageManager).toBe(PrefixPerPackageManager[process.env.DEFAULT_SCRIPT_RUNNER || 'npm']);
  });
});