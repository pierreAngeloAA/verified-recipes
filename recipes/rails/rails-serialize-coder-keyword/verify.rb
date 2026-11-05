require_relative "../support"

class VerifyRecipe < Minitest::Test
  def test_correct_form_round_trips_through_the_database
    klass = model_class { serialize :prefs, coder: JSON }
    post = klass.create!(prefs: { "theme" => "dark" })

    assert_equal({ "theme" => "dark" }, klass.find(post.id).prefs)
  end

  def test_type_and_coder_form_works
    klass = model_class { serialize :prefs, type: Hash, coder: JSON }

    assert_equal({}, klass.new.prefs)
  end

  def test_mistake_still_fails
    assert_listed_error(__dir__, ArgumentError) do
      model_class { serialize :prefs, JSON }.new
    end
  end
end
