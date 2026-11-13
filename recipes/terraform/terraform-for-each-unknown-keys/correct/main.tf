variable "names" {
  type    = set(string)
  default = ["x"]
}
resource "terraform_data" "a" { for_each = var.names }
resource "terraform_data" "b" {
  for_each = { for name in var.names : name => terraform_data.a[name].id }
  input    = each.value
}
