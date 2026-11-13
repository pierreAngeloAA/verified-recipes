#:property JsonSerializerIsReflectionEnabledByDefault=true
using System.Text.Json;
JsonSerializer.Deserialize<Order>("{\"Status\":\"Active\"}");
enum Status { Active }
class Order { public Status Status { get; set; } }
