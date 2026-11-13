---
id: csharp-thread-abort-unsupported
title: Thread.Abort throws; cancel with CancellationToken
stack: csharp
applies_to: ">= 5"
tags: ["threads", "cancellation", "migration"]
errors: ["System.PlatformNotSupportedException: Thread abort is not supported on this platform."]
sources: ["https://learn.microsoft.com/en-us/dotnet/standard/threading/cancellation-in-managed-threads"]
---

## Mistake

```csharp
worker.Abort();
```

## Correct

```csharp
var cts = new CancellationTokenSource();
var task = Task.Run(() => Work(cts.Token));
cts.Cancel();  // Work checks token.ThrowIfCancellationRequested()
```

## Why

Only .NET Framework supported Abort. Cooperative cancellation is the replacement.
