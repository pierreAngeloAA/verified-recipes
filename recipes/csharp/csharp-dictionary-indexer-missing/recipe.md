---
id: csharp-dictionary-indexer-missing
title: dict[key] throws for missing keys; use TryGetValue
stack: csharp
applies_to: ">= 1"
tags: ["collections", "dictionary"]
errors: ["System.Collections.Generic.KeyNotFoundException: The given key 'theme' was not present in the dictionary."]
sources: ["https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.trygetvalue"]
---

## Mistake

```csharp
var theme = settings["theme"];
```

## Correct

```csharp
var theme = settings.TryGetValue("theme", out var t) ? t : "light";
// or settings.GetValueOrDefault("theme", "light")
```

## Why

The indexer getter never returns null/default; the setter adds or replaces.
