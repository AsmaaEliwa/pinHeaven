# == Schema Information
#
# Table name: board_pins
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  board_id   :bigint           not null
#  pin_id     :bigint           not null
#
# Indexes
#
#  index_board_pins_on_board_id  (board_id)
#  index_board_pins_on_pin_id    (pin_id)
#
class BoardPin < ApplicationRecord
    belongs_to :pin, foreign_key: 'pin_id'
    belongs_to :board, foreign_key: 'board_id'
    validates :pin_id, uniqueness: { scope: :board_id }
end
