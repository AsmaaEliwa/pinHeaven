class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  # before_action :require_logged_in, only: [:show]

  wrap_parameters include: User.attribute_names + ['password']
  def show 
    @user=User.find_by() 
    render :show
  end


  def create
    # render json: user_params
@user=User.new(user_params)
if @user.save 
  login!(@user)
  render 'api/users/show'
else
render json: { errors: @user.errors.full_messages },
status: :unprocessable_entity
end
  end





  private

def user_params
  params.require(:user).permit(:email, :username ,:birth_date, :password)
end
end
