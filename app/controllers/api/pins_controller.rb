class Api::PinsController < ApplicationController
    wrap_parameters include: Pin.attribute_names + [:image]
    def show
        @pin=Pin.find_by(id: params[:id])
         if @pin
    render 'api/pins/show'
  else
    render json: { error: "Pin not found" }, status: :not_found
  end
        
    end

    def index
        if params[:user_id].present?
            @pins=Pin.where(user_id: params[:user_id]).order(created_at: :asc)
        else
            @pins=Pin.all
        end
        render 'api/pins/index'
    end

    def create
        # debugger
        @pin = Pin.new(pin_params)
        if @pin.save 
        render 'api/pins/show'
        else
        render json: { errors: @pin.errors.full_messages }
        end
   end

    def update
        @pin=Pin.find_by(id: params[:id])
        if @pin&.update(pin_params)
            render 'api/pins/show'
        else
            render json: { errors: @pin.errors.full_messages }
        end
    end

    def destroy
        @pin=Pin.find_by(id: params[:id])
        if @pin&.destroy
            render json: {messages: "success"}
        else
            render json: { errors: ["pin not found"] }
        end
    end




    private
    def pin_params
        params.require(:pin).permit(:user_id,:title,:description,:image)
    end
end
