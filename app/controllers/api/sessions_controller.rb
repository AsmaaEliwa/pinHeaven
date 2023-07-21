class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in ,only: [:destroy,:show,:index]

  def show
    if current_user
    @user= current_user
    render 'api/users/show'
    else 
      render json:{ user: nil }
    end
  end

  def create
    @user=User.find_by_credentials(params[:credential],params[:password])
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json:{ errors: "The provided credentials were invalid." }
  end
end
  def destroy
    logout!
    head :no_content 
    render json:{ erroes: "signed Out" }
  end
  
end
