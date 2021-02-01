class Api::CategoriesController < ApplicationController
  before_action :authorize_access_request!, only: [:update, :create]
  protect_from_forgery except: [:create, :update]

  def index
    render json: { data: Category.where(status: 1) }, status: :ok
  end

  def show
    render json: { data: Category.find_by(id: params[:id]) }, include: { products: { methods: :image_url } }, status: :ok
  end

  def create
    category = Category.new(category_param)
    if category.save
      render json: { data: category }, status: :ok
    else
      render json: { data: category.errors }, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find_by(id: params[:id])
    if category.update(category_param)
      render json: { data: category }, status: :ok
    else
      render json: { data: category.errors }, status: :unprocessable_entity
    end
  end

  def delete
  end

  private

  def category_param
    params.require(:category).permit(:name, :status)
  end
end
