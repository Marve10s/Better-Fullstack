Marten.configure :test do |config|
  config.database do |db|
    db.name = ":memory:"
  end
end
