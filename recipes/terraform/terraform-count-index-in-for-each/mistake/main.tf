resource "terraform_data" "x" {
  for_each = toset(["a"])
  input    = "web-${count.index}"
}
