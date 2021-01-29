class Category < ApplicationRecord
  before_save :default_values
  enum status: { inactive: 0, active: 1 }

  validates :name, length: { minimum: 1, maximum: 40 }, presence: true

  private

  def default_values
    self.status ||= 1
  end
end
