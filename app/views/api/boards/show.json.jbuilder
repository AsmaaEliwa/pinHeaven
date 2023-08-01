json.board do
    json.extract! @board, :id, :title, :created_at, :updated_at
    json.pin_ids @board.pins.pluck(:id)
  end