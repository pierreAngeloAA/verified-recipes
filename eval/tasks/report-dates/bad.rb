module ReportFormatter
  def self.stamp(time) = time.to_s(:db)
  def self.long_date(date) = date.to_s(:long)
end
