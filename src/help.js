import chalk from 'chalk';

export function showHelp() {
  const help = `
${chalk.bold('SCRIPT SELECTOR')}
This tool helps you select and copy script commands from your package.json.
Run it on your project folder to visualize, select and copy a script to the clipboard. Then just paste and run it.

${chalk.bold('Usage:')}
  $ scripts
  Then you can move using the arrow keys, filter by typing, and if you press enter,
  the selected script will be copied to the clipboard.
  
  For example, if you have and select "dev" in a Node project script list, the command "npm run dev" 
  will be copied to the clipboard, and this tool will exit, allowing you then to just paste and run it.

${chalk.bold('Environment Variables:')}
  DEFAULT_SCRIPT_RUNNER You can set this up globally or locally  (default: "npm").
    It defines what script runner to use when no script runner could be inferred.
    The valid values are "npm", "yarn", "deno, "bun" and "pnpm".
`;

  console.log(help);
}