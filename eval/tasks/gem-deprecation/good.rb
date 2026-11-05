module MyGem
  DEPRECATOR = ActiveSupport::Deprecation.new("2.0", "MyGem")

  def self.old_api
    DEPRECATOR.warn("old_api is deprecated")
    42
  end
end
