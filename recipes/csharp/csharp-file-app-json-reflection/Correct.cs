using System.Text.Json;
using System.Text.Json.Serialization;
var s = JsonSerializer.Serialize(new User { Name = "a" }, AppJson.Default.User);
return s == "{\"Name\":\"a\"}" ? 0 : 1;
class User { public string? Name { get; set; } }
[JsonSerializable(typeof(User))] partial class AppJson : JsonSerializerContext {}
