require "db"
require "sqlite3"
require "./greeting_request"

module GreetingStore
  @@database : DB::Database?

  def self.database : DB::Database
    @@database ||= DB.open(ENV.fetch("DATABASE_URL", "sqlite3://./development.sqlite3")).tap do |database|
      database.exec "CREATE TABLE IF NOT EXISTS greetings (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)"
    end
  end

  def self.create(raw_body : String) : GreetingRequest::Result
    GreetingRequest.with_name(raw_body) do |value|
      name = Greeting.name(value)
      database.exec "INSERT INTO greetings (name) VALUES (?)", name
      GreetingRequest::Result.new(201, {name: name}.to_json)
    rescue ex : ArgumentError
      GreetingRequest::Result.new(422, {error: ex.message}.to_json)
    end
  end

  def self.list : GreetingRequest::Result
    names = database.query_all("SELECT name FROM greetings ORDER BY id DESC LIMIT 20", as: String)
    GreetingRequest::Result.new(200, {greetings: names}.to_json)
  end
end
