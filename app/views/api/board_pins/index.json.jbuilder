  @board_pins.each do|board_pin| 
    json.set! board_pin.board_id, board_pin.board.pin_ids
  end





