require_relative "../support"

class VerifyRecipe < Minitest::Test
  def test_correct_form_warns_through_an_instance
    deprecator = ActiveSupport::Deprecation.new("2.0", "MyGem")
    deprecator.behavior = :raise

    error = assert_raises(ActiveSupport::DeprecationException) do
      deprecator.warn("Use new_method instead")
    end
    assert_includes error.message, "Use new_method instead"
  end

  def test_mistake_still_fails
    assert_listed_error(__dir__, NoMethodError) do
      ActiveSupport::Deprecation.warn("Use new_method instead")
    end
  end
end
