variable "names" {
  type    = list(string)
  default = ["a", "b"]
}
resource "terraform_data" "x" {
  count = length(var.names)
  input = each.value
}
