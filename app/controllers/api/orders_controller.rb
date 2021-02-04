class Api::OrdersController < ApplicationController
  before_action :authorize_access_request!
  before_action :find_order, only: %i[show destroy update]
  protect_from_forgery except: [:create, :update]
  VIEW_ROLES = %w[user admin].freeze

  def index
    render json: { data: Order.all }, include: { user: { only: [:first_name, :last_name, :email] } }, status: :ok
  end

  def show
    render json: { data: @order }, include: { order_details: {
             include: { product: { only: [:id, :name], methods: :image_url } },
             only: [:id, :price, :quantity, :discount],
           } }, status: :ok
  end

  def create
    new_order = current_user.orders.new(order_params)

    if new_order.save
      render json: { data: new_order }, status: :ok
    else
      render json: { data: new_order.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @order.update(order_params)
      render json: { data: @order }, include: [{ order_details: { include: { product: { only: [:id, :name], methods: :image_url } } } }, { user: { only: [:first_name, :last_name, :email] } }], status: :ok
    else
      render json: { data: @order.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @order.destroy
      render json: { data: @order }, status: :ok
    else
      render json: { data: @order.errors }, status: :unprocessable_entity
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
    %w[index destroy update].include?(action_name)  ? 'admin' : VIEW_ROLES
  end

  def find_order
    @order = Order.find_by(id: params[:id])
  end

  def order_params
    params.require(:order).permit(:phone, :address, :status, :purchase_order, order_details_attributes: [:product_id, :price, :discount, :quantity])
  end
end
