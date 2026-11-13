variable "state_path" {
  type    = string
  default = "x.tfstate"
}
terraform {
  backend "local" { path = var.state_path }
}
