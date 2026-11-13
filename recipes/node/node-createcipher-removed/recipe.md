---
id: node-createcipher-removed
title: crypto.createCipher is removed; use createCipheriv
stack: node
applies_to: ">= 22"
tags: ["crypto", "security", "encryption", "migration"]
errors: ["createCipher is not a function"]
sources: ["https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options"]
---

## Mistake

```js
const c = crypto.createCipher('aes-256-cbc', password);
```

## Correct

```js
const key = crypto.scryptSync(password, salt, 32);
const iv = crypto.randomBytes(12);
const c = crypto.createCipheriv('aes-256-gcm', key, iv); // store iv + c.getAuthTag()
```

## Why

The old API derived the key with MD5 and no salt or IV. Prefer an AEAD mode such as GCM.
