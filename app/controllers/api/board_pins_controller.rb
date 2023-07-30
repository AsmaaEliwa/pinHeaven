class Api::BoardPinsController < ApplicationController

    def index
        if params[:board_id]
            board = Board.find_by(id: params[:board_id])
            @pins = board.pins
            render "api/pins/index"
        else
            render json: ["Something went wrong"], status: 422
        end
    end
    def create
        @board_pins=BoardPin.new(board_pins_params)
        if @board_pins.save
        else render "api/boards/show"
        else
          render json: { error: "board_pins not found" }, status: :not_found

        end
    end

    def update
        @board_pins=BoardPin.find_by(id: params[:id])
        if @board_pins.update(board_pins_params)
        else render "api/boards/show"
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
