#:property JsonSerializerIsReflectionEnabledByDefault=true
using System.Text.Json;
using System.Text.Json.Serialization;
var o = new JsonSerializerOptions { Converters = { new JsonStringEnumConverter() } };
return JsonSerializer.Deserialize<Order>("{\"Status\":\"Active\"}", o)!.Status == Status.Active ? 0 : 1;
enum Status { Active }
class Order { public Status Status { get; set; } }
