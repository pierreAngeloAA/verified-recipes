resource "terraform_data" "a" { for_each = toset(["x"]) }
resource "terraform_data" "b" {
  for_each = toset([for v in terraform_data.a : v.id])
}
