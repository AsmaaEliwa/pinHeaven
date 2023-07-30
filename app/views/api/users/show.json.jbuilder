json.user do
    json.extract! @user, :id, :email, :username, :birth_date, :created_at, :updated_at, :pin_ids 
    json.board_ids @user.boards.pluck(:id)
    json.board_pins_ids @user.board_pins.pluck(:id)
    json.img_url @user.picture.url
    
end