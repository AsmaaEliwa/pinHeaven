class Api::BoardPinsController < ApplicationController
    def show
        @board_pin=BoardPin.find_by(id: params[:id])
        if @board_pin
   render 'api/board_pins/show'
 else
   render json: { error: "Pin not found" }, status: :not_found
    end
    def index
        if params[:board_id].present?
            @board_pins = BoardPin.where(board_id: params[:board_id]).order(created_at: :desc)
        else
            @board_pins = BoardPin.all.order(created_at: :asc)
        end
        render :index
    end
    def create
        @board_pins=BoardPin.new(board_pins_params)
        if @board_pins.save
        else render "api/board_pins/show"
        else
          render json: { error: "board_pins not found" }, status: :not_found

        end
    end

    def update
        @board_pins=BoardPin.find_by(id: params[:id])
        if @board_pins.update(board_pins_params)
        else render "api/board_pins/show"
        else
          render json: { error: "board_pins cant be updated" }, status: :not_found

        end
    end

    def destroy 
           @board_pins=BoardPin.find_by(id: params[:id])
        if @board_pins&.destroy
            render json: {messages: "success"}
        else
            render json: { errors: ["board_pins not found"] }
        end
    end

    private
    def board_pins_params
        params.require(:board_bins).permit(:pin_id,:board_id)
    end
end
