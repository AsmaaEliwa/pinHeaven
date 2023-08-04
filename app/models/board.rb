# == Schema Information
#
# Table name: boards
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_boards_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Board < ApplicationRecord
    validates :title, presence: true, uniqueness: { scope: :user_id }
    validates :user_id, presence: true
    belongs_to :user
    has_many :board_pins, dependent: :destroy
    has_many :pins, through: :board_pins, source: :pin
end
