require "./database"
require "./greeting_request"

module GreetingStore
  def self.create(raw_body : String) : GreetingRequest::Result
    GreetingRequest.with_name(raw_body) do |value|
      record = GreetingRecord::SaveOperation.create!(name: Greeting.name(value))
      GreetingRequest::Result.new(201, {name: record.name}.to_json)
    rescue ex : ArgumentError
      GreetingRequest::Result.new(422, {error: ex.message}.to_json)
    end
  end

  def self.list : GreetingRequest::Result
    names = GreetingRecord::BaseQuery.new.id.desc_order.limit(20).map(&.name)
    GreetingRequest::Result.new(200, {greetings: names}.to_json)
  end
end
