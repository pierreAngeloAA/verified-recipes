import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const VERIFY_FILES = {
  anthropic: 'verify.py',
  aws: 'verify.py',
  csharp: 'verify.sh',
  docker: 'verify.sh',
  go: 'verify.sh',
  langchain: 'verify.py',
  mcp: 'verify.py',
  java: 'verify.sh',
  kubernetes: 'verify.sh',
  node: 'verify.mjs',
  openai: 'verify.py',
  php: 'verify.sh',
  postgresql: 'verify.sh',
  python: 'verify.py',
  rails: 'verify.rb', react: 'verify.mjs', rust: 'verify.sh', spring: 'verify.sh', swift: 'verify.sh',
  terraform: 'verify.sh',
  typescript: 'verify.mjs' };

const REQUIRED_STRINGS = ['id', 'title', 'stack', 'applies_to'];
const REQUIRED_LISTS = ['tags', 'errors', 'sources'];
const REQUIRED_SECTIONS = ['Mistake', 'Correct', 'Why'];

const ALLOWED_HOSTS = new Set([
  'guides.rubyonrails.org',
  'api.rubyonrails.org',
  'edgeguides.rubyonrails.org',
  'github.com',
  'react.dev',
  'www.swift.org',
  'docs.swift.org',
  'developer.apple.com',
  'docs.spring.io',
  'go.dev',
  'platform.claude.com',
  'py.sdk.modelcontextprotocol.io',
  'docs.langchain.com',
  'platform.openai.com',
  'pkg.go.dev',
  'docs.python.org',
  'www.typescriptlang.org',
  'nodejs.org',
  'developer.mozilla.org',
  'docs.docker.com',
  'kubernetes.io',
  'developer.hashicorp.com',
  'boto3.amazonaws.com',
  'docs.aws.amazon.com',
  'docs.oracle.com',
  'openjdk.org',
  'learn.microsoft.com',
  'doc.rust-lang.org',
  'www.php.net',
  'wiki.php.net',
  'www.postgresql.org',
]);

const INVISIBLE = /[​-‏‪-‮⁠-⁤﻿]|[\u{E0000}-\u{E007F}]/u;
const PIPE_TO_SHELL = /\b(?:curl|wget)\b[^\n|]*\|\s*(?:sudo\s+)?(?:ba|z|da)?sh\b/i;
const AGENT_DIRECTIVE =
  /\b(?:ignore|disregard|forget)\b[^\n.]*\b(?:previous|prior|above|earlier|all)\b[^\n.]*\b(?:instructions?|prompts?|rules?)\b|\b(?:you are|as) an? (?:ai|assistant|agent|llm)\b|\bsystem prompt\b/i;

export function parseRecipe(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('missing frontmatter block');

  const meta = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) throw new Error(`invalid frontmatter line: ${line}`);
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (value.startsWith('[') || value.startsWith('"')) {
      try {
        meta[key] = JSON.parse(value);
      } catch {
        throw new Error(`invalid JSON value for ${key}`);
      }
    } else {
      meta[key] = value;
    }
  }
  return { meta, body: match[2] };
}

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

export function checkSafety(raw) {
  const problems = [];
  if (INVISIBLE.test(raw)) problems.push('contains invisible Unicode characters');
  if (raw.includes('<!--')) problems.push('contains an HTML comment');
  if (PIPE_TO_SHELL.test(raw)) problems.push('pipes a download into a shell');
  if (AGENT_DIRECTIVE.test(raw)) problems.push('contains text addressed to an AI agent');
  if (/<\/?[a-zA-Z][^>\n]*>/.test(stripCode(raw))) problems.push('contains raw HTML');

  for (const [url] of raw.matchAll(/\bhttps?:\/\/[^\s)"'`\]]+/g)) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      problems.push(`invalid URL: ${url}`);
      continue;
    }
    if (parsed.protocol !== 'https:') problems.push(`URL is not https: ${url}`);
    if (!ALLOWED_HOSTS.has(parsed.hostname)) problems.push(`host is not allowed: ${parsed.hostname}`);
  }
  return problems;
}

export function validateRecipe({ raw, folderName, stackFolder, files }) {
  const problems = checkSafety(raw);

  let parsed;
  try {
    parsed = parseRecipe(raw);
  } catch (error) {
    return [...problems, error.message];
  }
  const { meta, body } = parsed;

  for (const key of REQUIRED_STRINGS) {
    if (typeof meta[key] !== 'string' || meta[key] === '') problems.push(`${key} is required`);
  }
  for (const key of REQUIRED_LISTS) {
    const value = meta[key];
    const valid = Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string' && item);
    if (!valid) problems.push(`${key} must be a non-empty list of strings`);
  }

  if (typeof meta.id === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.id)) problems.push('id must use lowercase letters, digits and hyphens');
    if (meta.id !== folderName) problems.push(`id "${meta.id}" must match folder "${folderName}"`);
    if (!meta.id.startsWith(`${stackFolder}-`)) problems.push(`id must start with "${stackFolder}-"`);
  }

  if (meta.stack !== stackFolder) problems.push(`stack "${meta.stack}" must match folder "${stackFolder}"`);
  const verifyFile = VERIFY_FILES[stackFolder];
  if (!verifyFile) problems.push(`unknown stack "${stackFolder}"`);
  else if (!files.includes(verifyFile)) problems.push(`missing ${verifyFile}`);

  for (const section of REQUIRED_SECTIONS) {
    if (!new RegExp(`^## ${section}$`, 'm').test(body)) problems.push(`missing section "## ${section}"`);
  }
  return problems;
}

function isDirectory(path) {
  return statSync(path).isDirectory();
}

export function loadRecipes(root) {
  const recipesDir = join(root, 'recipes');
  const recipes = [];
  for (const stack of readdirSync(recipesDir).sort()) {
    const stackDir = join(recipesDir, stack);
    if (!isDirectory(stackDir)) continue;
    for (const folderName of readdirSync(stackDir).sort()) {
      const dir = join(stackDir, folderName);
      if (!isDirectory(dir) || folderName === 'node_modules') continue;
      const recipePath = join(dir, 'recipe.md');
      const raw = existsSync(recipePath) ? readFileSync(recipePath, 'utf8') : null;
      recipes.push({ stack, folderName, dir, raw, files: readdirSync(dir) });
    }
  }
  return recipes;
}
