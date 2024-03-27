class AddWeekStartToShifts < ActiveRecord::Migration[7.0]
  def change
    add_column :shifts, :week_start, :date
  end
end
