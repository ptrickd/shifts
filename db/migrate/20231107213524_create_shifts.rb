class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.bigint :employee_id
      t.date :date
      t.time :start_time
      t.time :end_time
      t.boolean :is_split_shift

      t.timestamps
    end
  end
end
