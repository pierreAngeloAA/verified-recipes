resource "terraform_data" "x" { for_each = toset(["a"]) }
output "id" { value = terraform_data.x["a"].id }
