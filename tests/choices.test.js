import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchChoices, getChoices, optionQuit } from '../src/choices.js';
import { readFile } from 'fs/promises';

vi.mock('fs/promises');

describe('choices module', () => {
  const mockPackageJson = {
    scripts: {
      start: 'node index.js',
      test: 'vitest',
      build: 'tsc',
      lint: 'eslint .'
    }
  };

  const mockPackageJsonScripts = [optionQuit,
    {
      value: 'start',
      name: '\x1B[32m\x1B[1m 0): start: \x1B[22m\x1B[39m\x1B[2mnode index.js\x1B[22m'
    },
    {
      value: 'test',
      name: '\x1B[32m\x1B[1m 1): test: \x1B[22m\x1B[39m\x1B[2mvitest\x1B[22m'
    },
    {
      value: 'build',
      name: '\x1B[32m\x1B[1m 2): build: \x1B[22m\x1B[39m\x1B[2mtsc\x1B[22m'
    },
    {
      value: 'lint',
      name: '\x1B[32m\x1B[1m 3): lint: \x1B[22m\x1B[39m\x1B[2meslint .\x1B[22m'
    },
  ];

  const prettyJsonScriptsDict = mockPackageJsonScripts.reduce((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
  }, {});

  beforeEach(() => {
    readFile.mockImplementation(async () => JSON.stringify(mockPackageJson));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getChoices', () => {
    it('should return all scripts plus Quit option', async () => {
      const choices = await getChoices();
      expect(choices).toEqual(mockPackageJsonScripts);
    });

    it('should handle missing scripts in package.json', async () => {
      readFile.mockResolvedValue(JSON.stringify({}));
      const choices = await getChoices();
      expect(choices).toEqual([optionQuit]);
    });

    it('should handle file read errors', async () => {
      readFile.mockImplementation(() => {
        throw new Error('File not found');
      });
      const choices = await getChoices();
      expect(choices).toEqual([optionQuit]);
    });
  });

  describe('searchChoices', () => {

    it('should filter choices based on input', () => {
      const filtered = searchChoices(mockPackageJsonScripts)('test');
      expect(filtered).toEqual([prettyJsonScriptsDict['test']]);
    });

    it('should be case insensitive', () => {
      const filtered = searchChoices(mockPackageJsonScripts)('TEST');
      expect(filtered).toEqual([prettyJsonScriptsDict['test']]);
    });

    it('should return all choices when input is empty', () => {
      const filtered = searchChoices(mockPackageJsonScripts)('');
      expect(filtered).toEqual(mockPackageJsonScripts);
    });

    it('should return empty array when no matches found', () => {
      const filtered = searchChoices(mockPackageJsonScripts)('asdasd');
      expect(filtered).toEqual([]);
    });
  });
});