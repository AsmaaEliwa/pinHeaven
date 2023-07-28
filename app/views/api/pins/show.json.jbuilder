json.pin do
if @pin
  json.extract!  @pin, :id, :title , :description, :user_id ,:created_at, :updated_at
  json.img_url  @pin.image.attached? ?  @pin.image.url : nil
   else
  json.error "Pin not found"
   end
end