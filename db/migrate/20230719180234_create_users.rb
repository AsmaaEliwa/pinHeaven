class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :email, null:false
      t.string :user_name, null:false 
      t.string :password_digest, null:false
      t.string :session_token, null:false
      t.date :birth_date,  null:false
      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :user_name, unique: true
    add_index :users, :session_token, unique: true
  end
end
