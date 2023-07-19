class Api::SessionsController < ApplicationController
  def show
    if current_user
    @user= current_user
    render json:{ user: current_user}
    else 
      render json:{ user: nil }
    end
  end

  def create
    @user=User.find_by_credentials(params[:credential],params[:password])
    if @user
      login!(@user)
      render json:{ user: @user }
    else
      render json:{ erroes: "The provided credentials were invalid." }
  end
end
  def destroy
    logout!
    render json:{ erroes: "signed Out" }
  end
  
end
