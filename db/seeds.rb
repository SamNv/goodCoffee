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
  phone: Faker::PhoneNumber.phone_number_with_country_code,
  address: Faker::Address.postcode,
  role: 1,
)

(1..15).each do |i|
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: "user#{i}@123.com",
    password: "asdfasdf",
    password_confirmation: "asdfasdf",
    phone: Faker::PhoneNumber.phone_number_with_country_code,
    address: Faker::Address.postcode 
  )
end

(1..15).each do |i|
  category = Category.create!(
    name: Faker::Coffee.variety,
  )
  (1..10).each do |e|
    category.products.create(
      name: Faker::Coffee.variety,
      price: Faker::Number.between(from: 1, to: 100),
      discount: Faker::Number.between(from: 1, to: 10)
    )
  end
end
