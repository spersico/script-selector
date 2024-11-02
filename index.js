#!/usr/bin/env node

import chalk from 'chalk';
import clipboardy from 'clipboardy';
import { getSelection } from './src/prompt.js';
import { showHelp } from './src/help.js';
import { getScriptPrefix } from './src/prefix.js';

// Check both direct args and npm forwarded args (after --)
const args = process.argv.slice(2);
const npmArgs = process.env.npm_config_argv
  ? JSON.parse(process.env.npm_config_argv).original.slice(2)
  : [];

const hasHelpFlag = [...args, ...npmArgs].some(arg =>
  arg === '--help' || arg === '-h'
);

if (hasHelpFlag) {
  showHelp();
  process.exit(0);
}

try {
  const [selection, scriptPrefix] = await Promise.all([getSelection(), getScriptPrefix()]);

  if (selection === 'Quit') {
    console.warn(chalk.yellow('Exited without making a selection (nothing was copied). Bye!'));
    process.exit(0);
  }

  const command = `${scriptPrefix} ${selection}`;
  try {
    await clipboardy.write(command);
    console.log(chalk.green.bold(`Copied to clipboard: ${chalk.underline(command)} (CMD/CTRL+V to paste). Bye!`));
  } catch (error) {
    console.log(chalk.red(`Failed to copy to clipboard: ${error.message}`));
  }
} catch (error) {
  if (error?.name === 'ExitPromptError') {
    console.warn(chalk.yellow('Exited without making a selection (nothing was copied). Bye!'));
    process.exit(0);
  } else {
    console.error(chalk.red('Error getting selection:', error?.message));
    process.exit(1);
  }
}

process.on('SIGINT', process.exit(0));