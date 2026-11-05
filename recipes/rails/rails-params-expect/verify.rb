require_relative "../support"
require "rack/mock"

class ParamsExpectApp < Rails::Application
  config.load_defaults Rails::VERSION::STRING.to_f
  config.eager_load = false
  config.logger = Logger.new(IO::NULL)
  config.secret_key_base = "verification-only"
  config.hosts.clear
  config.consider_all_requests_local = false
  config.action_dispatch.show_exceptions = :all
end

class UsersController < ActionController::API
  def old_form
    render json: params.require(:user).permit(:name)
  end

  def new_form
    render json: params.expect(user: [:name])
  end
end

ParamsExpectApp.initialize!
ParamsExpectApp.routes.draw do
  post "/old", to: "users#old_form"
  post "/new", to: "users#new_form"
end

class VerifyRecipe < Minitest::Test
  def post(path, params)
    Rack::MockRequest.new(ParamsExpectApp).post(path, params: params)
  end

  def test_correct_form_accepts_valid_input
    response = post("/new", { "user" => { "name" => "Ana" } })

    assert_equal 200, response.status
    assert_equal({ "name" => "Ana" }, JSON.parse(response.body))
  end

  def test_correct_form_filters_unpermitted_keys
    response = post("/new", { "user" => { "name" => "Ana", "admin" => "1" } })

    assert_equal({ "name" => "Ana" }, JSON.parse(response.body))
  end

  def test_correct_form_returns_400_on_tampered_input
    assert_equal 400, post("/new", { "user" => "tampered" }).status
  end

  def test_mistake_returns_500_on_tampered_input
    assert_equal 500, post("/old", { "user" => "tampered" }).status
  end

  def test_mistake_raises_the_listed_error
    assert_listed_error(__dir__, NoMethodError) do
      ActionController::Parameters.new(user: "tampered").require(:user).permit(:name)
    end
  end
end
