---
id: csharp-collection-modified-foreach
title: Don't modify a List inside foreach
stack: csharp
applies_to: ">= 1"
tags: ["collections", "iteration", "bugs"]
errors: ["System.InvalidOperationException: Collection was modified; enumeration operation may not execute."]
sources: ["https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.removeall"]
---

## Mistake

```csharp
foreach (var x in items) if (x.Done) items.Remove(x);
```

## Correct

```csharp
items.RemoveAll(x => x.Done);
// dictionaries: foreach (var k in dict.Keys.ToList()) dict.Remove(k);
```

## Why

The enumerator checks a version counter on each MoveNext.
