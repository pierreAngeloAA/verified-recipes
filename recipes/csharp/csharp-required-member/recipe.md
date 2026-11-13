---
id: csharp-required-member
title: required members must be set in the initializer
stack: csharp
applies_to: ">= 7"
tags: ["records", "required", "nullable"]
errors: ["error CS9035: Required member 'User.Name' must be set in the object initializer or attribute constructor."]
sources: ["https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/required"]
---

## Mistake

```csharp
public class User { public required string Name { get; init; } }
var u = new User();
```

## Correct

```csharp
var u = new User { Name = "Ada" };
// constructor that sets it: mark it [SetsRequiredMembers]
```

## Why

Also hits deserializers and generic `new()` constraints, which cannot satisfy required members.
