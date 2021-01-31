class Product < ApplicationRecord
  before_save :default_values

  belongs_to :category

  enum status: { inactive: 0, active: 1 }
  validates :name, length: { minimum: 1, maximum: 40 }, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :discount, numericality: { greater_than_or_equal_to: 0, less_then_or_equal_to: 100, only_integer: true }

  private

  def default_values
    self.status ||= 1
    self.price ||= 0
    self.discount ||= 0
  end
end
