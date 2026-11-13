variable "names" {
  type    = set(string)
  default = ["x"]
}
resource "terraform_data" "a" { for_each = var.names }
resource "terraform_data" "b" {
  for_each = toset([for name in var.names : terraform_data.a[name].id])
}
