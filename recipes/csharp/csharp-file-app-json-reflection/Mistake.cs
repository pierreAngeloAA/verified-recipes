using System.Text.Json;
JsonSerializer.Serialize(new User { Name = "a" });
class User { public string? Name { get; set; } }
