json.user do
    json.extract! @user, :id, :email, :username, :birth_date, :created_at, :updated_at, :pin_ids
    json.img_url @user.picture.url
end