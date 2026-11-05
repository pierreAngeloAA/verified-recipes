require_relative "../../check_support"
load ENV.fetch("SOLUTION")

class Check < Minitest::Test
  def test_formats
    assert_equal "2026-01-02 03:04:05", ReportFormatter.stamp(Time.utc(2026, 1, 2, 3, 4, 5))
    assert_equal "January 02, 2026", ReportFormatter.long_date(Date.new(2026, 1, 2))
  end
end
