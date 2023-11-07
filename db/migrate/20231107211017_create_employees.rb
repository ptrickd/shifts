class CreateEmployees < ActiveRecord::Migration[7.0]
  def change
    create_table :employees do |t|
      t.boolean :is_active
      t.integer :position
      t.string :first_name
      t.string :last_name
      t.string :display_name

      t.timestamps
    end
  end
end
