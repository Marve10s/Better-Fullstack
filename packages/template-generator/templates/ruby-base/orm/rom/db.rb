require "rom"
require "rom-sql"

module BetterFullstack
  module Database
    PATH = File.expand_path(ENV.fetch("DATABASE_PATH", "db/#{ENV.fetch("RACK_ENV", "development")}.sqlite3"), __dir__)
    MIGRATIONS = File.expand_path("db/migrate", __dir__)
    CONFIGURATION = ROM::Configuration.new(:sql, "sqlite://#{PATH}")

    def self.migrate!
      CONFIGURATION.default_gateway.run_migrations(path: MIGRATIONS)
    end
  end
end
