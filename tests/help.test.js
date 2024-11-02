import { describe, it, expect, vi, afterEach } from 'vitest';
import { showHelp } from '../src/help.js';

describe('help module', () => {
  const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('should display help message', () => {
    showHelp();
    expect(consoleSpy).toHaveBeenCalled();
    const helpMessage = consoleSpy.mock.calls[0][0];

    expect(helpMessage).toContain('SCRIPT SELECTOR');
    expect(helpMessage).toContain('Usage:');
    expect(helpMessage).toContain('Environment Variables:');
  });
});