import { checkNode } from '../support.mjs';

checkNode(import.meta.dirname,
  {
    "a.mjs": "import crypto from 'node:crypto'; const key = crypto.scryptSync('pw', 'salt', 32), iv = crypto.randomBytes(12); const c = crypto.createCipheriv('aes-256-gcm', key, iv); const enc = Buffer.concat([c.update('hi'), c.final()]); const d = crypto.createDecipheriv('aes-256-gcm', key, iv); d.setAuthTag(c.getAuthTag()); if (Buffer.concat([d.update(enc), d.final()]).toString() !== 'hi') process.exit(1);",
  },
  {
    "a.mjs": "import crypto from 'node:crypto'; crypto.createCipher('aes-256-cbc', 'pw');",
  });
