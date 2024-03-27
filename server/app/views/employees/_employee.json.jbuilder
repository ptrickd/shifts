json.extract! employee, :id, :is_active, :position, :first_name, :last_name, :display_name, :created_at, :updated_at
json.url employee_url(employee, format: :json)
