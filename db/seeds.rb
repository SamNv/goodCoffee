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
    phone: '09012345678',
    address: '〒106-0044東京都港区東麻布1-8-1 東麻布ISビル4F',
  )
end

categories = [
  {
    category: "Fruit Frenzy",
    products: ["APPLE & RASPBERRY SMOOTHIE",
               "GREEN APPLE CUCUMBER SLUSH",
               "AVOCADO RASPBERRY MEDLEY",
               "BERRY AND POMEGRANATE GREEN TEA",
               "LEMON LYCHEE TEA"],
  },
  {
    category: "Drinks",
    products: ["SWEET COLD BREW",
               "COLD BREW",
               "CAFE AMERICANO",
               "CAPPUCCINO",
               "CARAMEL LATTE",
               "CAFE MOCHA",
               "COFFEE INDOCHINE",
               "VIETNAMESE LATTE",
               "CA PHE SUA DA",
               "WHITE MOCHA",
               "BREWED COFFEE",
               "ICED CAFE LATTE"],
  },
  {
    category: "Cakes and Pastries",
    products: ["SALTED CARAMEL CHEESECAKE
      "],
  },
  {
    category: "Savory Delights",
    products: [
      "MUSHROOM OMELETTE",
      "BEEF TAPA",
      "GARLIC LONGGANISA",
      "CLASSIC CORNED BEEF",
      "CONTINENTAL BREAKFAST",
      "HAM AND CHEESE OMELETTE",
      "FISH N CHIPS",
    ],
  },
  {
    category: "Pasta",
    products: ["CREAMY PESTO AND MUSHROOM PASTA",
               "ARRABBIATA PENNE",
               "CARBONARA",
               "SARDINE PASTA",
               "SAUSAGE AND GARLIC PASTA"],
  },
  {
    category: "Salad",
    products: ["CAESAR SALAD",
               "GREEK SALAD",
               "CALIFORNIA KANI SALAD"],
  },
]

categories.each do |i|
  category = Category.create!(name: i[:category])
  i[:products].each do |p|
    category.products.create(
      name: p,
      price: Faker::Number.between(from: 75, to: 200),
      discount: Faker::Number.between(from: 20, to: 50),
    )
  end
end
# Sandwich
# TUNA MELT
# BACON 4 CHEESE
# CLUBHOUSE

# drink //
# "COFFEE CRÉME BRULÉE",
# "CHOCOLATE COOKIE",


#〒100-8994
# 東京都千代田区丸ノ内二丁目7番2号

#〒100-8994
# 東京都千代田区八丸ノ内2-7-2