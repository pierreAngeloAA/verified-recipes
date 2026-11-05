require_relative "../../check_support"
load ENV.fetch("SOLUTION")

class Check < Minitest::Test
  def test_warns_and_returns
    result = nil
    _out, err = capture_io { result = MyGem.old_api }
    assert_equal 42, result
    assert_includes err, "DEPRECATION WARNING"
    assert_includes err, "old_api is deprecated"
  end
end
