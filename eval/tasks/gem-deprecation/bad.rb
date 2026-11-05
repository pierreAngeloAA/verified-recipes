module MyGem
  def self.old_api
    ActiveSupport::Deprecation.warn("old_api is deprecated")
    42
  end
end
