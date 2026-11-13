---
id: node-fetch-body-read-twice
title: A fetch Response body can be read only once
stack: node
applies_to: ">= 20"
tags: ["fetch", "http", "streams"]
errors: ["Body is unusable: Body has already been read"]
sources: ["https://developer.mozilla.org/en-US/docs/Web/API/Response/clone"]
---

## Mistake

```js
const text = await res.text();
const data = await res.json(); // TypeError
```

## Correct

```js
const text = await res.text();
const data = JSON.parse(text);
// or read a copy first: await res.clone().text()
```

## Why

The body is a stream. Common when logging the body before parsing it.
