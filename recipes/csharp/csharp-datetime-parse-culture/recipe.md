---
id: csharp-datetime-parse-culture
title: DateTime.Parse depends on the machine culture
stack: csharp
applies_to: ">= 1"
tags: ["dates", "parsing", "globalization"]
errors: ["System.FormatException: String '13/01/2026' was not recognized as a valid DateTime."]
sources: ["https://learn.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime"]
---

## Mistake

```csharp
var d = DateTime.Parse("13/01/2026");  // works on es-ES, fails on en-US and in containers
```

## Correct

```csharp
var d = DateTime.ParseExact("13/01/2026", "dd/MM/yyyy", CultureInfo.InvariantCulture);
```

## Why

Containers often run with InvariantCulture (MM/dd/yyyy). Use ParseExact or ISO 8601 for data.
