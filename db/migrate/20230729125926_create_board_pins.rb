class CreateBoardPins < ActiveRecord::Migration[7.0]
  def change
    create_table :board_pins do |t|
      t.references :board , null:false 
      t.references :pin , null:false 
      t.timestamps
    end
  end
end
