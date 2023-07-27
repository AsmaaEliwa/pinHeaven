json.pin do
  json.extract! @pin, :id, :title , :description, :user_id ,:created_at, :updated_at
  json.img_url  @pin.image.attached? ?  @pin.image.url : nil
   
end