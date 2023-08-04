Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # post 'api/test', to: 'application#test'
  namespace :api, defaults: { format: :json } do
    get 'pins/search', to: "pins#search"

    resources :users, only: [:create,:show,:update ,:index]
    resource :session, only: [:show, :create, :destroy]
    resources :pins 
    resources :boards 
    resources :board_pins 
  end
  get '*path', to: "static_pages#frontend_index"
end
