## Script Selector

This tool helps you select and copy script commands from your package.json.

Run it on your project base folder to visualize, select and copy a script to the clipboard. Then just paste and run it.

This doesn't run the script, it just copies it to the clipboard, allowing you to paste it in your terminal and modifying it before runnning it.

Inference works by just checking if there's a lock file of some type in the current folder, and defaults to `npm` if none is found.


[![Example of the app running in a terminal](<README.screenshot.png>)](https://www.youtube.com/embed/C-HNP0JqEGA)

### Instalation and Usage
You can use npx to run it without installing it (though it will be slower each time it needs to be downloaded).:
```bash
npx script-selector
```

Or you can install it globally:
```bash
npm install -g script-selector
```

And then just use it:
```bash
script-selector
```

## Configuration - Environment Variables

- `DEFAULT_SCRIPT_RUNNER`: It defines what script runner to use when no script runner could be inferred.

    Valid values are `npm`, `yarn`, `deno`, `bun` and `pnpm`. Defaults to `npm`.