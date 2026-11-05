require_relative "../../check_support"
require "rack/mock"

class EvalApp < Rails::Application
  config.load_defaults Rails::VERSION::STRING.to_f
  config.eager_load = false
  config.logger = Logger.new(IO::NULL)
  config.secret_key_base = "evaluation-only"
  config.hosts.clear
  config.consider_all_requests_local = false
  config.action_dispatch.show_exceptions = :all
end

load ENV.fetch("SOLUTION")
EvalApp.initialize!
EvalApp.routes.draw { post "/users", to: "users#create" }

class Check < Minitest::Test
  def post_user(params) = Rack::MockRequest.new(EvalApp).post("/users", params: params)

  def test_valid_input
    response = post_user({ "user" => { "name" => "Ana", "admin" => "1" } })
    assert_equal 200, response.status
    assert_equal({ "name" => "Ana" }, JSON.parse(response.body))
  end

  def test_malformed_input
    assert_equal 400, post_user({ "user" => "tampered" }).status
  end
end
