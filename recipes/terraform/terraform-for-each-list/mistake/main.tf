resource "terraform_data" "x" {
  for_each = ["a", "b"]
  input    = each.value
}
