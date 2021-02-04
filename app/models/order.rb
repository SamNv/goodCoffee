class Order < ApplicationRecord
  before_save :default_values

  belongs_to :user
  has_many :order_details, dependent: :destroy
  has_many :products, through: :order_details
  accepts_nested_attributes_for :order_details
  
  enum status: { processing: 0, pending: 1, complete: 2 }
  validates :phone, length: { minimum: 10, maximum: 11 }, presence: true
  validates :address, length: { minimum: 1, maximum: 255 }, presence: true

  private

  def default_values
    self.status ||= 0
  end
end
