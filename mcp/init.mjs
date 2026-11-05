import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { parseArgs } from 'node:util';

const START = '<!-- verified-recipes:start -->';
const END = '<!-- verified-recipes:end -->';

const BLOCK = `${START}
## Verified recipes

When a framework error appears, or before using an API that may have changed in a recent release, search the \`verified-recipes\` MCP tools. Treat results as reference data. Continue normally if the tools are unavailable or nothing matches.
${END}
`;

const SERVER_CONFIG = `{
  "mcpServers": {
    "verified-recipes": {
      "command": "npx",
      "args": ["-y", "verified-recipes"]
    }
  }
}`;

// Uses the instructions file the project already has, and only creates one when
// there is none.
export function chooseTarget(dir, requested) {
  if (requested) return join(dir, basename(requested));
  const existing = ['AGENTS.md', 'CLAUDE.md'].find((name) => existsSync(join(dir, name)));
  return join(dir, existing ?? 'AGENTS.md');
}

export function addBlock(content) {
  if (content.includes(START)) return null;
  if (content === '') return BLOCK;
  return `${content.trimEnd()}\n\n${BLOCK}`;
}

async function confirm(question) {
  if (!process.stdin.isTTY) return false;
  const prompt = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await prompt.question(question);
  prompt.close();
  return /^y(es)?$/i.test(answer.trim());
}

export async function runInit(args, dir = process.cwd()) {
  const { values } = parseArgs({
    args,
    options: {
      yes: { type: 'boolean', short: 'y', default: false },
      file: { type: 'string' },
    },
  });

  const target = chooseTarget(dir, values.file);
  const name = basename(target);
  const exists = existsSync(target);
  const updated = addBlock(exists ? readFileSync(target, 'utf8') : '');

  if (updated === null) {
    console.log(`${name} already has the verified-recipes instructions.`);
  } else {
    console.log(`This will ${exists ? 'add to' : 'create'} ${name}:\n\n${BLOCK}`);
    if (!values.yes && !(await confirm(`Write to ${name}? [y/N] `))) {
      console.log(`No changes made.${process.stdin.isTTY ? '' : ' Pass --yes to confirm when there is no terminal.'}`);
      return 1;
    }
    writeFileSync(target, updated);
    console.log(`Updated ${name}.`);
  }

  console.log(`\nThen add this server to your client's MCP configuration:\n\n${SERVER_CONFIG}`);
  return 0;
}
