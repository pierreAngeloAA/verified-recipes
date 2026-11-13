---
id: csharp-binaryformatter-removed
title: BinaryFormatter is removed; use System.Text.Json
stack: csharp
applies_to: ">= 9"
tags: ["serialization", "security", "migration"]
errors: ["error SYSLIB0011", "BinaryFormatter serialization is obsolete"]
sources: ["https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-migration-guide/"]
---

## Mistake

```csharp
new BinaryFormatter().Serialize(stream, obj);
```

## Correct

```csharp
JsonSerializer.Serialize(stream, obj);  // or MessagePack / protobuf for binary
```

## Why

Unsafe for untrusted input; .NET 9 removed the implementation (it throws) and the API is a build error.
