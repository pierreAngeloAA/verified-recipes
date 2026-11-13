---
id: csharp-stj-enum-string
title: System.Text.Json reads enums as numbers by default
stack: csharp
applies_to: ">= 5"
tags: ["json", "enums", "serialization"]
errors: ["System.Text.Json.JsonException: The JSON value could not be converted to Status"]
sources: ["https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/customize-properties#enums-as-strings"]
---

## Mistake

```csharp
JsonSerializer.Deserialize<Order>("""{"Status":"Active"}""");
```

## Correct

```csharp
var opts = new JsonSerializerOptions { Converters = { new JsonStringEnumConverter() } };
JsonSerializer.Deserialize<Order>(json, opts);
// or [JsonConverter(typeof(JsonStringEnumConverter<Status>))] on the enum
```

## Why

Newtonsoft habits don't carry over. ASP.NET Core: add the converter in AddJsonOptions.
