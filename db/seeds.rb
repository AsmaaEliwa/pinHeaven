# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'open-uri'

# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Follow.destroy_all
  BoardPin.destroy_all
  Board.destroy_all
  Pin.destroy_all
  User.destroy_all


  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('pins')
  ApplicationRecord.connection.reset_pk_sequence!('board_pins')
  ApplicationRecord.connection.reset_pk_sequence!('boards')
  ApplicationRecord.connection.reset_pk_sequence!('follows')


  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  demo = User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password',
    birth_date: "01-01-2023"
  )
  demo1 = User.create!({
    username: "asmaaEliwa",
    email: Faker::Internet.unique.email,
    password: 'password',
    birth_date: Faker::Date.birthday(min_age: 18, max_age: 65)
  })
  demo2 = User.create!({
    username: "hakeem",
    email: Faker::Internet.unique.email,
    password: 'password',
    birth_date: Faker::Date.birthday(min_age: 18, max_age: 65)
  })


  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      birth_date: Faker::Date.birthday(min_age: 18, max_age: 65)
    }) 
  end
  
  puts "Creating Pins..."
  place_pin = Pin.new({title: "Castle", description: "This is salah elden Castle", user_id: demo.id})
  place_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/2eb010066af3ae163c9ec71b3482601f.jpg"), filename: "castle.jpg")
  place_pin.save!

  place_pin1 = Pin.new({title: "temple", description: "This issimbel temple ", user_id: demo.id})
  place_pin1.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/072b0b5f9782acb157fdd3ba70768e0a.jpg"), filename: "temple.jpg")
  place_pin1.save!

  place_pin2 = Pin.new({title: "mosque", description: "big mosque ", user_id: demo.id})
  place_pin2.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/577d4eea903b5621d7ea7f33813dfd3b.jpg"), filename: "mosque.jpg")
  place_pin2.save!

  place_pin3 = Pin.new({title: "karnak", description: "in luxor egypt ", user_id: demo.id})
  place_pin3.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/fe4bca7f51b0d4f036402c88550fd80d.jpg"), filename: "karnak.jpg")
  place_pin3.save!

  place_pin4 = Pin.new({title: "want to see this ", description: "do u know where", user_id: demo.id})
  place_pin4.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/b2830629117cc148a7b2dbd7ea17de39.jpg"), filename: "m.jpg")
  place_pin4.save!

  place_pin5 = Pin.new({title: "moez street ", description: "lovely street", user_id: demo.id})
  place_pin5.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/c2b7fd4fc34238e7861c4c48e321b5b2.jpg"), filename: "moez.jpg")
  place_pin5.save!

  place_pin6 = Pin.new({title: "abw alhwl statue ", description: "lovely ", user_id: demo.id})
  place_pin6.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/52d4dc49332fbc5dc7359d9f2d31a773.jpg"), filename: "statue.jpg")
  place_pin6.save!



  place_pin7 = Pin.new({title: "the pyramids ", description: " amazing view of the pyramids", user_id: demo1.id})
  place_pin7.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/bfa30f28314c4af00e0e7b14fc480844.jpg"), filename: "pyramids.jpg")
  place_pin7.save!

  place_pin8 = Pin.new({title: "the nile ", description: " aswan view", user_id: demo1.id})
  place_pin8.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/8cd5c2d41f417a3b5fde72f1d0f58281.jpg"), filename: "aswan.jpg")
  place_pin8.save!








  food_pin = Pin.new({title: "fool", description: "yummy ", user_id: demo.id})
  food_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/f1bc166dbeac546918b07e2bd9b621ed.jpg"), filename: "fool.jpg")
  food_pin.save!

  food_pin1 = Pin.new({title: "grape leaves", description: "stuffed with rice inside  ", user_id: demo.id})
  food_pin1.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/1f3734934bddf74dc370d6cdac2416a1.jpg"), filename: "grape.jpg")
  food_pin1.save!

  food_pin3 = Pin.new({title: "fool", description: "with olive oil ", user_id: demo.id})
  food_pin3.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/bed63ea60cb81e62f3d8ec81e5596e25.jpg"), filename: "olive.jpg")
  food_pin3.save!

  food_pin4 = Pin.new({title: "grilled chiken", description: "healthy and yummy ", user_id: demo.id})
  food_pin4.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/e9ed74b0e6f12dfd4f912b9509a3d41f.jpg"), filename: "chiken.jpg")
  food_pin4.save!



  # food_pin5 = Pin.new({title: "mix", description: "looks yummy ", user_id: demo1.id})
  # food_pin5.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/a24524c60d6ea16adf8cf6aad6b45e77.jpg"), filename: "mix.jpg")
  # food_pin5.save!

  # food_pin6 = Pin.new({title: "shawrma", description: "looks yummy ", user_id: demo1.id})
  # food_pin6.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/563b5552b9e03515784e94ec3beda3e8.jpg"), filename: "shawrma.jpg")
  # food_pin6.save!

  # food_pin7 = Pin.new({title: "panckake", description: "looks yummy ", user_id: demo2.id})
  # food_pin7.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/307fea1119f75ef7af78473c12249f66.jpg"), filename: "panckake.jpg")
  # food_pin7.save!

  # food_pin8 = Pin.new({title: "burger", description: "looks yummy ", user_id: demo2.id})
  # food_pin8.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/01a8b20022d3ac8d1c0ad960e7b67466.jpg"), filename: "burger.jpg")
  # food_pin8.save!





  decor_pin = Pin.new({title: "kitchen", description: "nice color ", user_id: demo.id})
  decor_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/1f8fe404f66b649a1dfebae9988657ee.jpg"), filename: "kitchen.jpg")
  decor_pin.save!

  decor_pin1 = Pin.new({title: "restaurant", description: "love this restaurant decor ", user_id: demo.id})
  decor_pin1.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/7cb6a0f6343a3e4f5e26e1e39b483f42.jpg"), filename: "restaurant.jpg")
  decor_pin1.save!

  decor_pin2 = Pin.new({title: "nice decor", description: "love this corner decor ", user_id: demo.id})
  decor_pin2.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/606138ddc9d103cddab18d1863332c53.jpg"), filename: "corner.jpg")
  decor_pin2.save!

  decor_pin3 = Pin.new({title: "nice decor", description: "love this corner decor ", user_id: demo.id})
  decor_pin3.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/82c9b66e92b002e3eb0de857bf2dc36d.jpg"), filename: "corners.jpg")
  decor_pin3.save!




  # decor_pin4 = Pin.new({title: "nice table", description: "love this corner decor ", user_id: demo1.id})
  # decor_pin4.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/89100997481fba2d67d20db1177b80c3.jpg"), filename: "table.jpg")
  # decor_pin4.save!

  # decor_pin5 = Pin.new({title: "nice decor", description: "love this decor ", user_id: demo1.id})
  # decor_pin5.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/86566817e878e2fa23f21872c31c4dd2.jpg"), filename: "nice.jpg")
  # decor_pin5.save!




  ballons_pin = Pin.new({title: "nice color", description: "would be nice for a birthday party ", user_id: demo1.id})
  ballons_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/d2a48d4c63686276eaa9af4614076b7c.jpg"), filename: "birthday.jpg")
  ballons_pin.save!



  outfits_pin = Pin.new({title: "nice dress", description: "would be nice for a  party ", user_id: demo.id})
  outfits_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/363b510d5772a5d5b9943a3cea2c0320.jpg"), filename: "dress.jpg")
  outfits_pin.save!


  plants_pin = Pin.new({title: "plant", description: "the best next to th tv", user_id: demo.id})
  plants_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/9fbe0cd6c1335ad0a3a3a9d1aed03ef3.jpg"), filename: "plant.jpg")
  plants_pin.save!


  nails_pin = Pin.new({title: "nails", description: "my favorite nails color", user_id: demo.id})
  nails_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/0cfdfabecdf6d6b3488da9088c9850bd.jpg"), filename: "nails.jpg")
  nails_pin.save!

  

  gift_pin = Pin.new({title: "gift", description: "want this  gift", user_id: demo2.id})
  gift_pin.image.attach(io: URI.open("https://pinheaven-seeds.s3.us-east-2.amazonaws.com/6d5cf80e331a6cefcb67aceaf1e6e9c0.jpg"), filename: "gift.jpg")
  gift_pin.save!


  puts "Creating Boards..."
  board_1 = Board.create!({title: "Places to go", user_id: demo.id})
  board_2 = Board.create!({title: "Egyption Food", user_id: demo.id})
  board_3 = Board.create!({title: "Decor", user_id: demo.id})
  board_4 = Board.create!({title: "plants and flower", user_id: demo.id})
  board_5 = Board.create!({title: "Nails", user_id: demo.id})


  board_6 = Board.create!({title: "Places to go", user_id: demo1.id})
  board_8 = Board.create!({title: "Decor", user_id: demo1.id})
  board_7 = Board.create!({title: "Ballons", user_id: demo1.id})


  board_9 = Board.create!({title: "Gift ideas", user_id: demo2.id})
  board_10 = Board.create!({title: "Outfits", user_id: demo2.id})





  puts "Creating Board Pins..."

  board_pin_1 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin.id})
  board_pin_2 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin1.id})
  board_pin_3 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin2.id})
  board_pin_4 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin3.id})
  board_pin_5 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin4.id})
  board_pin_6 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin5.id})
  board_pin_7 = BoardPin.create!({board_id: board_1.id, pin_id: place_pin6.id})


  board_pin_8 = BoardPin.create!({board_id: board_2.id, pin_id: food_pin.id})
  board_pin_9 = BoardPin.create!({board_id: board_2.id, pin_id: food_pin3.id})
  board_pin_10 = BoardPin.create!({board_id: board_2.id, pin_id: food_pin4.id})
  board_pin_11 = BoardPin.create!({board_id: board_2.id, pin_id: food_pin1.id})

  
  board_pin_12 = BoardPin.create!({board_id: board_3.id, pin_id: decor_pin.id})
  board_pin_13 = BoardPin.create!({board_id: board_3.id, pin_id: decor_pin1.id})
  board_pin_14 = BoardPin.create!({board_id: board_3.id, pin_id: decor_pin2.id})
  board_pin_15 = BoardPin.create!({board_id: board_3.id, pin_id: decor_pin3.id})

  board_pin_16 = BoardPin.create!({board_id: board_4.id, pin_id: plants_pin.id})

  board_pin_17 = BoardPin.create!({board_id: board_5.id, pin_id: nails_pin.id})


  board_pin_18 = BoardPin.create!({board_id: board_6.id, pin_id: place_pin7.id})
  board_pin_19 = BoardPin.create!({board_id: board_6.id, pin_id: place_pin8.id})
  board_pin_20 = BoardPin.create!({board_id: board_7.id, pin_id: ballons_pin.id})


  board_pin_21 = BoardPin.create!({board_id: board_9.id, pin_id: gift_pin.id})
  board_pin_22 = BoardPin.create!({board_id: board_10.id, pin_id: outfits_pin.id})







  puts "Done!"
  # end