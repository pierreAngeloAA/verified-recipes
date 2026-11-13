using System.Text.Json;
var ms = new MemoryStream();
JsonSerializer.Serialize(ms, 1, JsonContext.Default.Int32);
return ms.Length == 1 ? 0 : 1;
[System.Text.Json.Serialization.JsonSerializable(typeof(int))] partial class JsonContext : System.Text.Json.Serialization.JsonSerializerContext {}
