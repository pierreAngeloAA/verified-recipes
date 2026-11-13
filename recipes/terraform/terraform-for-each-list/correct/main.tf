resource "terraform_data" "x" {
  for_each = toset(["a", "b"])
  input    = each.value
}
