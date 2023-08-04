class AddNotNullConstraintToTitleInPins < ActiveRecord::Migration[7.0]
  def change
    change_column_null :pins, :user_id, false
  end
end
