json.user do
  json.extract! @user, :id, :email, :username,:birth_date ,:created_at, :updated_at
  json.img_url @user.profilePicture.url
  json.pin_ids do
  json.array! @user.pins.pluck(:id)
end
end