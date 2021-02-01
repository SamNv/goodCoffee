class Product < ApplicationRecord
  include Rails.application.routes.url_helpers
  before_save :default_values

  belongs_to :category

  enum status: { inactive: 0, active: 1 }
  validates :name, length: { minimum: 1, maximum: 40 }, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0, only_integer: true }
  validates :discount, numericality: { greater_than_or_equal_to: 0, less_then_or_equal_to: 100, only_integer: true }, allow_blank: true

  has_one_attached :image

  validates :image,
    content_type: %i(gif png jpg jpeg),
    size: { less_than_or_equal_to: 5.megabytes }, allow_blank: true

  def image_url
    self.image.service_url if self.image.attached?
  end

  private

  def default_values
    self.status ||= 1
    self.price ||= 0
    self.discount ||= 0
  end
end
