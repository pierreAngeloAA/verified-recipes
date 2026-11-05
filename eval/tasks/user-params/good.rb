class UsersController < ActionController::API
  def create
    render json: params.expect(user: [:name])
  end
end
