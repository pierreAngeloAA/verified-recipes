require "json"
require "rails"
require "active_record"
require "action_controller/railtie"
require "minitest/autorun"

module RecipeSupport
  # Fails unless the block raises one of the messages listed in the recipe,
  # which keeps the searchable `errors` field honest.
  def assert_listed_error(recipe_dir, expected_class)
    listed = File.read(File.join(recipe_dir, "recipe.md"))[/^errors: (\[.*\])$/, 1]
    errors = JSON.parse(listed)
    raised = assert_raises(expected_class) { yield }
    assert errors.any? { |message| raised.message.include?(message) },
           "#{raised.message.inspect} is not listed in #{errors.inspect}"
  end

  def model_class(&body)
    Class.new(ActiveRecord::Base) do
      self.table_name = "posts"
      class_eval(&body)
    end
  end
end

ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: ":memory:")
ActiveRecord::Schema.verbose = false
ActiveRecord::Schema.define do
  create_table(:posts) do |t|
    t.integer :status
    t.text :prefs
  end
end

Minitest::Test.include(RecipeSupport)
Minitest.after_run do
  puts "VERSIONS #{JSON.generate(rails: Rails.version, ruby: RUBY_VERSION)}"
end
