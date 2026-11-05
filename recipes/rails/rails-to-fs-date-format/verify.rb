require_relative "../support"

class VerifyRecipe < Minitest::Test
  TIME = Time.utc(2026, 1, 2, 3, 4, 5)
  DATE = Date.new(2026, 1, 2)

  def test_correct_form_works
    assert_equal "2026-01-02 03:04:05", TIME.to_fs(:db)
    assert_equal "January 02, 2026", DATE.to_fs(:long)
    assert_equal TIME.to_fs(:db), TIME.to_formatted_s(:db)
  end

  def test_time_mistake_still_fails
    assert_listed_error(__dir__, ArgumentError) { TIME.to_s(:db) }
  end

  def test_date_mistake_still_fails
    assert_listed_error(__dir__, ArgumentError) { DATE.to_s(:long) }
  end
end
