class Api::ProductsController < ApplicationController
  before_action :authorize_access_request!, only: [:update, :create]
  protect_from_forgery except: [:create, :update]
  VIEW_ROLES = %w[user admin].freeze

  def index
    render json: { data: Product.where(status: 1) }, include: :category, methods: [:image_url], status: :ok
  end

  def create
    product = Product.new(product_params)
    if product.save
      render json: { data: product }, include: :category, methods: [:image_url], status: :ok
    else
      render json: { data: product.errors }, status: :unprocessable_entity
    end
  end

  def update
    product = Product.find_by(id: params[:id])
    if product.update(product_params)
      render json: { data: product }, include: :category, methods: [:image_url], status: :ok
    else
      render json: { data: product.errors }, status: :unprocessable_entity
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
    action_name == "index" ? VIEW_ROLES : "admin"
  end

  def product_params
    params.permit(:name, :price, :discount, :status, :image, :category_id)
  end
end
