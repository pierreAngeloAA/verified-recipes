---
id: csharp-encoding-codepages
title: Code-page encodings (1252, Shift-JIS) need a provider
stack: csharp
applies_to: ">= 5"
tags: ["encoding", "text", "files"]
errors: ["System.NotSupportedException: No data is available for encoding 1252."]
sources: ["https://learn.microsoft.com/en-us/dotnet/api/system.text.codepagesencodingprovider"]
---

## Mistake

```csharp
var enc = Encoding.GetEncoding(1252);  // or "windows-1252", "iso-8859-15", "shift_jis"
```

## Correct

```csharp
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);  // once at startup
var enc = Encoding.GetEncoding(1252);
```

## Why

Modern .NET ships only UTF-*, ASCII and Latin-1; legacy code pages are opt-in.
