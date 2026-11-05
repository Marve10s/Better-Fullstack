require "json"
require "./greeting"

module GreetingRequest
  record Result, status : Int32, body : String

  def self.query(name : String?) : Result
    Result.new(200, Greeting.response(name || "World"))
  rescue ex : ArgumentError
    Result.new(422, {error: ex.message}.to_json)
  end

  def self.json(raw_body : String) : Result
    with_name(raw_body) { |name| query(name) }
  end

  def self.with_name(raw_body : String, & : String -> Result) : Result
    name = JSON.parse(raw_body).as_h["name"]?.try(&.as_s?)
    return Result.new(422, {error: "name must be a string"}.to_json) unless name
    yield name
  rescue JSON::ParseException
    Result.new(400, {error: "invalid JSON"}.to_json)
  rescue TypeCastError
    Result.new(422, {error: "JSON object required"}.to_json)
  end
end
