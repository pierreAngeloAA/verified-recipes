class Setting < ActiveRecord::Base
  serialize :prefs, JSON
end
