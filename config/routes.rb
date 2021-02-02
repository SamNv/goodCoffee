Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    post "signup", controller: :users, action: :create
    post "signin", controller: :sessions, action: :create
    delete "signin", controller: :sessions, action: :destroy
    post "refresh", controller: :refresh, action: :create
    # get "users", controller: :users, action: :index

    get "me", controller: :users, action: :me
    resources :users, only: [:show, :index]
    resources :categories, except: [:new, :edit]
    resources :products, except: [:new, :show, :edit]
    resources :orders, except: [:new]
  end

  get "*path", to: "home#index"
end
