class Setting < ActiveRecord::Base
  serialize :prefs, coder: JSON
end
