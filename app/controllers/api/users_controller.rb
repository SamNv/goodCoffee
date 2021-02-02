class Api::UsersController < ApplicationController
  before_action :authorize_access_request!, only: [:me, :index, :show]
  protect_from_forgery except: [:create]

  def me
    render json: current_user.as_json(only: [:id, :first_name, :last_name, :phone, :address, :email, :role], include: { orders: { include: { order_details: {
                                        include: { product: { only: [:id, :name], methods: :image_url } },
                                        only: [:id, :price, :quantity, :discount],
                                      } } } })
  end

  def index
    render json: { data: User.all }, include: :orders, status: :ok
  end

  def show
    user = User.find_by(id: params[:id])
    render json: { data: user }, include: { orders: { include: { order_details: {
      include: { product: { only: [:id, :name], methods: :image_url } },
      only: [:id, :price, :quantity, :discount],
    } } } }, status: :ok
  end

  def create
    user = User.new(user_params)
    if user.save
      # payloadは，トークン自体に内包させられるユーザー情報。ここではuser_idを内包させている。
      payload = { user_id: user.id, aud: [user.role] }
      session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
      tokens = session.login

      # Set-Cookieヘッダーに{jwt_access=アクセストークン; Secure; HttpOnly}をセットして送信
      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          secure: Rails.env.production?)
      # LocalStorageに保存するためのCSRFトークンを返す。
      render json: { csrf: tokens[:csrf] }
    else
      render json: { error: user.errors.full_messages[0] }, status: :unprocessable_entity
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
    if action_name == 'index'
      return 'admin'
    end
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def check_admin
    if current_user && current_user.role == "user"
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end
end
