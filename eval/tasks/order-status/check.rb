require_relative "../../check_support"
load ENV.fetch("SOLUTION")

class Check < Minitest::Test
  def test_status
    order = Order.create!(status: :shipped)
    assert_predicate order, :shipped?
    assert_equal 1, ActiveRecord::Base.connection.select_value("SELECT status FROM orders WHERE id = #{order.id}")
    assert_predicate Order.new(status: :delivered), :delivered?
  end
end
