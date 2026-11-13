---
id: csharp-file-app-json-reflection
title: File-based apps (dotnet run app.cs) disable reflection JSON
stack: csharp
applies_to: ">= 10"
tags: ["json", "aot", "file-based-apps"]
errors: ["Reflection-based serialization has been disabled for this application"]
sources: ["https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/source-generation"]
---

## Mistake

```csharp
// app.cs, run with: dotnet run app.cs
var json = JsonSerializer.Serialize(user);
```

## Correct

```csharp
var json = JsonSerializer.Serialize(user, AppJson.Default.User);
[JsonSerializable(typeof(User))] partial class AppJson : JsonSerializerContext {}
// or opt out: #:property PublishAot=false
```

## Why

File-based apps default to PublishAot=true, which turns off reflection-based System.Text.Json. Same in any AOT/trimmed project.
