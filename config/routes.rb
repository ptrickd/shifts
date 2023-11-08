Rails.application.routes.draw do
  # root 'pages#index'

   namespace :api do
    namespace :v1 do
      resources :shifts
      resources :requests
      resources :employees
    end
  end

 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
