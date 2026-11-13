require_relative "../support"

ActiveRecord::Schema.define do
  create_table(:authors, force: true) { |t| t.string :name }
  create_table(:articles, force: true) { |t| t.string :title; t.integer :author_id }
end
class Author < ActiveRecord::Base; has_many :articles; end
class Article < ActiveRecord::Base; belongs_to :author, optional: true; end

class VerifyRecipe < Minitest::Test
  def teardown
    ActiveRecord::Base.belongs_to_required_by_default = false
  end

  def test_correct_form_works
    params = ActionController::Parameters.new(article: { title: "a" })
    assert_equal "a", Article.new(params.expect(article: [:title])).title
  end

  def test_mistake_still_fails
    assert_listed_error(__dir__, ActiveModel::ForbiddenAttributesError) do
      Article.new(ActionController::Parameters.new(title: "a"))
    end
  end
end
