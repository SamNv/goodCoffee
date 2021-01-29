# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: "admin@123.com",
  password: "asdfasdf",
  password_confirmation: "asdfasdf",
)

(1..15).each do |i|
  Category.create!(
    name: Faker::Coffee.variety,
    status: 0,
  )
end
