json.set! @board_pin.id do
  json.extract! @board_pin, :id, :board_id, :pin_id, :created_at, :updated_at
end