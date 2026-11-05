require "roda"
require "sequel/core"

module BetterFullstack
  class Auth < Roda
    CURRENT_USER = "better_fullstack.current_user"
    DATABASE_PATH = File.expand_path(ENV.fetch("DATABASE_PATH", "db/#{ENV.fetch("RACK_ENV", "development")}.sqlite3"), __dir__)
    MIGRATIONS = File.expand_path("db/auth_migrations", __dir__)
    DB = Sequel.sqlite(DATABASE_PATH)

    def self.session_secret
      ENV.fetch("SESSION_SECRET") do
        raise KeyError, "SESSION_SECRET is required when RACK_ENV=production" if ENV["RACK_ENV"] == "production"

        "development-only-session-secret-change-me-" * 2
      end
    end

    def self.migrate!
      Sequel.extension :migration
      Sequel::Migrator.run(DB, MIGRATIONS, table: :auth_schema_info)
    end

    plugin :middleware
    plugin :json_parser, content_type_regexp: /\Aapplication\/json\b/i
    plugin :sessions, secret: session_secret, key: "better_fullstack.session"
    plugin :rodauth, json: :only do
      db DB
      enable :json, :create_account, :login, :logout
      accounts_table :accounts
      account_password_hash_column :password_hash
      skip_status_checks? true
      require_login_confirmation? false
      require_password_confirmation? false
      hmac_secret Auth.session_secret
      already_logged_in do
        json_response[json_response_error_key] = "already logged in"
        response.status = 409
        return_json_response
      end
    end

    route do |r|
      r.rodauth
      env[CURRENT_USER] = rodauth.logged_in? ? { "id" => rodauth.session_value } : nil
    end
  end
end
