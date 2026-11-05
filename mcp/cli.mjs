#!/usr/bin/env node
const [command, ...args] = process.argv.slice(2);

if (command === 'init') {
  const { runInit } = await import('./init.mjs');
  process.exitCode = await runInit(args);
} else if (command === undefined) {
  await import('./server.mjs');
} else {
  console.error(`Unknown command "${command}". Run with no arguments to start the MCP server, or use "init".`);
  process.exitCode = 1;
}
