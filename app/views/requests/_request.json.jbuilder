json.extract! request, :id, :employee_id, :date, :category, :created_at, :updated_at
json.url request_url(request, format: :json)
