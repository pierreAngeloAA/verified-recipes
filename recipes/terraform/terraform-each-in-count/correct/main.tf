variable "names" {
  type    = list(string)
  default = ["a", "b"]
}
resource "terraform_data" "x" {
  for_each = toset(var.names)
  input    = each.value
}
