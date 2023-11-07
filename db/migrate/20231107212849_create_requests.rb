class CreateRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :requests do |t|
      t.bigint :employee_id
      t.date :date
      t.string :category

      t.timestamps
    end
  end
end
