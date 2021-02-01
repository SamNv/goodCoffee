class User < ApplicationRecord
  before_save :default_values

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  before_save { email.downcase! }

  ## VALIDATION
  enum role: { user: 0, admin: 1 }
  validates :first_name, length: {minimum: 1, maximum: 40}, presence: true 
  validates :last_name, length: {minimum: 1, maximum: 40}, presence: true 
  validates :email, presence: true,
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password

  def default_values
    self.role ||= 0
  end
end
