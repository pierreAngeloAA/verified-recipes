require_relative "../support"

class VerifyRecipe < Minitest::Test
  def test_correct_form_works
    post = model_class { enum :status, { draft: 0, published: 1 } }.new(status: :published)

    assert_predicate post, :published?
    assert_equal "published", post.status
  end

  def test_mistake_still_fails
    assert_listed_error(__dir__, ArgumentError) do
      model_class { enum status: { draft: 0, published: 1 } }.new
    end
  end
end
