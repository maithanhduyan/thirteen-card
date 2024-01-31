# phaser-typescript-vite
~~~~
    "@rollup/plugin-alias": "^5.1.0",
    "@rollup/plugin-commonjs": "^25.0.7",
    "@rollup/plugin-replace": "^5.0.5",
    "@types/node": "^20.11.6",
    "phaser": "^3.70.0",
    "typescript": "^5.3.3",
    "vite": "^5.0.12"
~~~~

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install project dependencies |
| `yarn dev` | Builds project and open web server, watching for changes |
| `yarn dev --host` | use --host to expose |
| `yarn build` | Builds code bundle with production settings  |
| `yarn serve` | Run a web server to serve built code bundle |

## Development

After cloning the repo, run `yarn install` from your project directory. Then, you can start the local development
server by running `yarn dev` and navigate to http://localhost:3000.

## Production

After running `yarn build`, the files you need for production will be on the `dist` folder. To test code on your `dist` folder, run `yarn serve` and navigate to http://localhost:5000