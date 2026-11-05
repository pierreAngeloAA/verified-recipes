require ENV.fetch("RECIPE_SUPPORT")

ActiveRecord::Schema.define do
  create_table(:orders) { |t| t.integer :status }
  create_table(:settings) { |t| t.text :prefs }
end
