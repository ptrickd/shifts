class ChangePositionToBeStringInEmployees < ActiveRecord::Migration[7.0]
  def change
    change_column :employees, :position, :string
  end
end
