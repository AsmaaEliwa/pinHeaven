json.array! @board_pins do |board_pin|
  json.extract! board_pin, :id, :board_id, :pin_id, :created_at, :updated_at
end