return Enum.TryParse<Status>("active", ignoreCase: true, out var s) && s == Status.Active ? 0 : 1;
enum Status { Active }
