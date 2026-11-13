resource "terraform_data" "x" {
  for_each = toset(["a"])
  input    = "web-${each.key}"
}
