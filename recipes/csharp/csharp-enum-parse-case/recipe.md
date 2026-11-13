---
id: csharp-enum-parse-case
title: Enum.Parse is case-sensitive by default
stack: csharp
applies_to: ">= 1"
tags: ["enums", "parsing"]
errors: ["System.ArgumentException: Requested value 'active' was not found."]
sources: ["https://learn.microsoft.com/en-us/dotnet/api/system.enum.tryparse"]
---

## Mistake

```csharp
var s = Enum.Parse<Status>("active");
```

## Correct

```csharp
var ok = Enum.TryParse<Status>("active", ignoreCase: true, out var s);
```

## Why

Use TryParse for input you don't control; note it also accepts numeric strings like "42" (check Enum.IsDefined).
