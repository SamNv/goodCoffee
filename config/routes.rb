Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    post "signup", controller: :users, action: :create
    post "signin", controller: :sessions, action: :create
    delete "signin", controller: :sessions, action: :destroy
    post "refresh", controller: :refresh, action: :create
    get "index", controller: :users, action: :index
  end

  get "*path", to: "home#index"
end
