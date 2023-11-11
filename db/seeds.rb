# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
Shift.destroy_all
Employee.destroy_all
Request.destroy_all

employees =
  Employee.create(
    [
      {
        is_active: true,
        position: "Cook",
        first_name: "Athena",
        last_name: "Galindo",
        display_name: "Athena"
      },
      {
        is_active: true,
        position: "Cook",
        first_name: "Salvatore",
        last_name: "McClain",
        display_name: "Salvatore"
      },
      {
        is_active: true,
        position: "Cook",
        first_name: "Marleigh",
        last_name: "Barnes",
        display_name: "Marleigh"
      },
      {
        is_active: true,
        position: "Cook",
        first_name: "Damian",
        last_name: "Rocha",
        display_name: "Damian"
      },
      {
        is_active: true,
        position: "Dishwasher",
        first_name: "Kevin",
        last_name: "Gentry",
        display_name: "Kevin"
      },
      {
        is_active: true,
        position: "Dishwasher",
        first_name: "Amelie",
        last_name: "Russo",
        display_name: "Amelie"
      }
    ]
  )

shifts =
  Shift.create(
    [
      {
        date: Time.new(2023, 8, 12),
        start_time: "11:00:00",
        end_time: "19:30:00",
        is_split_shift: false,
        employee: employees.first
      },
      {
        date: Time.new(2023, 8, 13),
        start_time: "11:00:00",
        end_time: "19:30:00",
        is_split_shift: false,
        employee: employees.first
      }
    ]
  )

requests =
  Request.create(
    [
      category: "Vacation",
      date: Time.new(2023, 8, 12),
      employee: employees.first
    ]
  )

# https://1000randomnames.com/
#Georgia Holt
# Niko Carrillo
# Kaylani Guerra
# Leland Torres
# Violet Jaramillo
# Riggs Benjamin
# Jianna Fitzpatrick
# Blaze Gentry
# Amelie Hodges
# Alonzo Short
