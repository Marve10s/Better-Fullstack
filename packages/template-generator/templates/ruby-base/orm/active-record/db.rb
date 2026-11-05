require "active_record"

module BetterFullstack
  module Database
    PATH = File.expand_path(ENV.fetch("DATABASE_PATH", "db/#{ENV.fetch("RACK_ENV", "development")}.sqlite3"), __dir__)
    MIGRATIONS = File.expand_path("db/migrate", __dir__)

    ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: PATH)
    ActiveRecord::Migration.verbose = ENV["RACK_ENV"] != "test"

    def self.migrate!
      ActiveRecord::MigrationContext.new(MIGRATIONS).migrate
    end
  end
end
