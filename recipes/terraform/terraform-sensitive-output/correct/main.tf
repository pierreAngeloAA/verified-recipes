variable "pw" {
  type      = string
  sensitive = true
  default   = "x"
}
output "pw" {
  value     = var.pw
  sensitive = true
}
