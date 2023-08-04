json.pins({})
json.pins do
@pins.each do |pin|
    json.set! pin.id do
    json.extract! pin, :id , :title , :description,:user_id
    json.img_url  pin.image.attached? ?  pin.image.url : nil
        end
    end
end