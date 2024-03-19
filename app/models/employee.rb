class Employee < ApplicationRecord
  has_many :requests
  has_many :shifts

  validates :display_name,
            uniqueness: {
              message: "Name to display must be unique"
            }
end
