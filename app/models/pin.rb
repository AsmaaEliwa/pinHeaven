# == Schema Information
#
# Table name: pins
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_pins_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
  require "open-uri"
  class Pin < ApplicationRecord
    validates :title, presence: true, length: { maximum: 255 }
    validates :user_id, presence: true
    validate :ensure_image
    # before_validation :generate_default_pic
    belongs_to :user
    has_one_attached :image

    def ensure_image
        unless self.image.attached?
          errors.add(:image, "must be attached")
        end
      end

      # def generate_default_pic
      #   unless self.image.attached?
      #     # Presumably you have already stored a default pic in your seeds bucket
      #     file = URI.open("https://pinheaven-seeds.s3.amazonaws.com/default_pic.jpg");
      #     self.image.attach(io: file, filename: "default.jpg")
      #   end
      # end

end
