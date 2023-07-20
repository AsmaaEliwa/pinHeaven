class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection
  protect_from_forgery with: :exception
  before_action :snake_case_params
      
    def test
      if params.has_key?(:login)
        login!(User.first)
      elsif params.has_key?(:logout)
        logout!
      end

      if current_user
        render json: { user: current_user.slice('id', 'email' , 'birth_date', 'user_name', 'session_token') }
      else
        render json: ['No current user']
      end
    end
      

    def login?
      !!current_user
    end
    def current_user
      @current_user ||= User.find_by(session_token: session[:session_token])end

    def login!(user)
      session[:session_token] = user.reset_session_token!
    end

    def logout!
      current_user&.reset_session_token!
      session.delete(:session_token)
      @current_user = nil # so that subsequent calls to `current_user` return nil
    end

    def require_logged_in
      unless current_user
        render json: { message: 'Unauthorized' }, status: :unauthorized 
      end
    end
    def require_logged_out
      if current_user
        render json: { message: 'Unauthorized' }, status: :unauthorized
      end
    end
    private
        
    def snake_case_params
      params.deep_transform_keys!(&:underscore)
    end

end
