var cts = new CancellationTokenSource();
var t = Task.Run(() => { while (true) cts.Token.ThrowIfCancellationRequested(); });
cts.Cancel();
try { t.Wait(); } catch (AggregateException e) when (e.InnerException is OperationCanceledException) { return 0; }
return 1;
