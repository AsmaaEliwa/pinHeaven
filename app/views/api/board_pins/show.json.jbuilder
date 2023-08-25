json.board_pin do
  json.set! @prev_board.id, @prev_board.pin_ids
  json.set! @next_board.id, @next_board.pin_ids
end