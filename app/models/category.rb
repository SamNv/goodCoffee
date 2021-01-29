class Category < ApplicationRecord
  before_save :default_values
  enum status: { active: 0, inactive: 1 }

  validates :name, length: { minimum: 1, maximum: 40 }, presence: true

  private

  def default_values
    self.status ||= 0
  end
end
