require "sequel"

module BetterFullstack
  module Database
    PATH = File.expand_path(ENV.fetch("DATABASE_PATH", "db/#{ENV.fetch("RACK_ENV", "development")}.sqlite3"), __dir__)
    MIGRATIONS = File.expand_path("db/migrations", __dir__)
    CONNECTION = Sequel.sqlite(PATH)

    Sequel.extension :migration

    def self.migrate!
      Sequel::Migrator.run(CONNECTION, MIGRATIONS)
    end
  end
end
