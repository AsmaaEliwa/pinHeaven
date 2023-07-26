json.array! @pins do |pin|
  json.id pin.id
  json.title pin.title
  json.description pin.description
  json.img_url @pin.image.url
  json.user_id pin.user_id
end