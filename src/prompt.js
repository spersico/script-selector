import { search } from '@inquirer/prompts';
import { getChoices, searchChoices } from './choices.js';

const message = 'Select a script (type to filter, or use the arrow keys) and press enter to copy:';

export async function getSelection() {
  const choices = await getChoices();
  const sourceFilterer = searchChoices(choices);
  return search({ message, source: sourceFilterer }, { clearPromptOnDone: true });
}