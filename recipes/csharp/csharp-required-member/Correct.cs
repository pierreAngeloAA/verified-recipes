var u = new User { Name = "Ada" };
return u.Name == "Ada" ? 0 : 1;
class User { public required string Name { get; init; } }
