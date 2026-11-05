module ReportFormatter
  def self.stamp(time) = time.to_fs(:db)
  def self.long_date(date) = date.to_fs(:long)
end
