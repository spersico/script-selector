import { readFile } from 'fs/promises';
import { resolve } from 'path';
import chalk from 'chalk';

export const optionQuit = (index = 0) => ({ name: chalk.yellow.bold(` ${index}) Quit: `) + chalk(`Exit this menu without copying`), value: 'Quit' });

export async function getChoices() {
  try {
    const packagePath = resolve(process.cwd(), 'package.json');
    const packageContent = await readFile(packagePath, 'utf8');
    const packageJson = JSON.parse(packageContent);
    const scripts = Object.entries(packageJson.scripts || {}).map(
      ([scriptName, scriptCommand], index) => {
        const greenTitle = chalk.green.bold(` ${index + 1}) ${scriptName}: `);
        const dimScript = chalk.dim(scriptCommand);
        return { value: scriptName, name: greenTitle + dimScript };
      }
    );
    return [optionQuit(0), ...scripts, optionQuit(scripts.length + 1)];
  } catch (error) {
    console.error(chalk.red.bold('Error getting choices:'), error.message);
    return [optionQuit];
  }
}

export function searchChoices(choices) {
  return (input = '') => {
    const lowerCasedInput = String(input).toLowerCase().trim();
    if (lowerCasedInput === '') { return choices; }
    if (lowerCasedInput === 'q') { return [optionQuit]; }
    if (Number.isInteger(parseInt(lowerCasedInput))) {
      return choices.filter(
        (_, index) => index - 1 === parseInt(lowerCasedInput)
      );
    }

    return choices.filter(choice =>
      choice.name.toLowerCase().includes(lowerCasedInput)
    );
  };
}