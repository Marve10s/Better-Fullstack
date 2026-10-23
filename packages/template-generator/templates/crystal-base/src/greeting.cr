require "json"

module Greeting
  def self.name(value : String) : String
    name = value.strip
    raise ArgumentError.new("name must contain 1 to 80 characters") if name.empty? || name.size > 80
    name
  end

  def self.response(value : String) : String
    {message: "Hello, #{name(value)}!"}.to_json
  end
end
