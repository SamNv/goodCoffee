class Api::CategoriesController < ApplicationController
  before_action :authorize_access_request!, only: [:update, :create]
  protect_from_forgery except: [:create, :update]
  VIEW_ROLES = %w[user admin].freeze
  
  def index
    render json: { data: Category.where(status: 1) }, status: :ok
  end

  def show
    render json: { data: Category.find_by(id: params[:id]) }, include: { products: { methods: :image_url } }, status: :ok
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: { data: category }, status: :ok
    else
      render json: { data: category.errors }, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find_by(id: params[:id])
    if category.update(category_params)
      render json: { data: category }, status: :ok
    else
      render json: { data: category.errors }, status: :unprocessable_entity
    end
  end

  def token_claims
    {
      aud: allowed_aud,
      verify_aud: true,
    }
  end

  private

  def allowed_aud
    %w[create update].include?(action_name)  ? 'admin' : VIEW_ROLES
  end

  def category_params
    params.require(:category).permit(:name, :status)
  end
end
