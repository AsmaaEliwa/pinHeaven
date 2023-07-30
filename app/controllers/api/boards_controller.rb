class Api::BoardsController < ApplicationController

    def show
        @board=Board.find_by(id: params[:id])
        if @board
            render 'api/boards/show'
        else
            render json: { error: "board not found" }, status: :not_found
         end
    end

    def index 
        @boards = Board.where('user_id = ?', params[:user_id])   
    end

 
    def create
        @board = Board.new(board_params)
        # if current_user
        #   @board.user_id = current_user.id
        # else
        #   return render json: { errors: ["You need to be authenticated to create a board"] }, status: 401
        # end
      
        if @board.save
          render 'api/boards/show'
        else
          render json: @board.errors.full_messages, status: :unprocessable_entity
        end
      end

    def destroy
        @board=Board.find_by(id: params[:id])
        if @board&.destroy
            render json: {messages: "success"}
        else
            render json: { errors: ["board not found"] }
        end
    end

    def update
        @board=Board.find_by(id: params[:id])
        if @board&.update(board_params)
            render 'api/boards/show'
        else
            render json: { errors: @board.errors.full_messages }
        end
    end


    private
    def board_params
        params.require(:board).permit(:title,:user_id)
    end
end
