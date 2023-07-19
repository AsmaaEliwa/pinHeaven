class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  def create
    # render json: user_params
@user=User.new(user_params)
if @user.save 
  login!(@user)
  render json: {user: @user}
else
render json: { errors: @user.errors.full_messages }
end
  end





  private

def user_params
  params.require(:user).permit(:email, :user_name ,:birth_date, :password)
end
end
