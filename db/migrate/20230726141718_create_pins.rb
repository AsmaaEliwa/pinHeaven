class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.references :user, foreign_key: true
      t.string :title ,null:false
      t.text   :description 
      t.timestamps
    end
  end
end
