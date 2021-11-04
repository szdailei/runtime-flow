#!/usr/bin/env node
/* eslint-disable no-console */
import { exec } from 'child_process';
import minimist from 'minimist';
import { runtimeFlowServer } from './dist/server.js';

const HELP = `Usage: runtime-flow [options]

start runtime-flow server and browser.

Options:
  -p, --port  Port of web. default: "3000".
  -flow, --flow   Directory of flow file. default: "./".
  -w, --web   Directory of index.html. default: "{server-dir}/web".
  -h, --help  Display help for command.`;

function openUrl(url) {
  let cmd;
  switch (process.platform) {
    case 'darwin':
      cmd = 'open';
      break;
    case 'win32':
      cmd = 'explorer.exe';
      break;
    case 'linux':
      cmd = 'xdg-open';
      break;
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
  exec(`${cmd} "${url}"`);
}

async function main() {
  const { argv } = process;

  const args = minimist(argv.slice(2), {
    boolean: ['help'],
    alias: {
      help: 'h',
      port: 'p',
      web: 'w',
      flow: 'f',
    },
    unknown: () => {
      console.log(HELP);
      process.exit(1);
    },
  });

  if (args.help) {
    console.log(HELP);
    process.exit(0);
  }

  const { port, web, flow } = args;
  const actualPort = await runtimeFlowServer({ port, web, flow });

  const url = `http://localhost:${actualPort}`;
//  openUrl(url);
}

main();
