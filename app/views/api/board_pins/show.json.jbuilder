# json.board_pin do
#   json.set! @prev_board.id, @prev_board.pin_ids
#   json.set! @next_board.id, @next_board.pin_ids
# end
json.set! @board_pin.board.id, @board_pin.board.pin_ids