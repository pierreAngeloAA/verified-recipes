require_relative "../../check_support"
load ENV.fetch("SOLUTION")

class Check < Minitest::Test
  def test_round_trip
    setting = Setting.create!(prefs: { "theme" => "dark" })
    assert_equal({ "theme" => "dark" }, Setting.find(setting.id).prefs)
    stored = ActiveRecord::Base.connection.select_value("SELECT prefs FROM settings WHERE id = #{setting.id}")
    assert_equal({ "theme" => "dark" }, JSON.parse(stored))
  end
end
