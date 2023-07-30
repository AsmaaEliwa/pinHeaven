json.boards do
    @boards.each do |board|
        json.set! board.id do
            json.extract! board, :id, :title,  :user_id , :pins, :created_at, :updated_at
        end
    end
end
