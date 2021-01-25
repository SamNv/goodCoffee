class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  before_save { email.downcase! }

  ## VALIDATION
  validates :first_name, length: {minimum: 1, maximum: 40}, presence: true 
  validates :last_name, length: {minimum: 1, maximum: 40}, presence: true 
  validates :email, presence: true,
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  has_secure_password
end
