class UsersController < ActionController::API
  def create
    render json: params.require(:user).permit(:name)
  end
end
