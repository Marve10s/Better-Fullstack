require "spec"
require "../src/greeting_request"

describe GreetingRequest do
  it "maps a query name to a JSON greeting" do
    result = GreetingRequest.query("Crystal")
    result.status.should eq(200)
    JSON.parse(result.body)["message"].as_s.should eq("Hello, Crystal!")
  end

  it "rejects invalid names, malformed JSON, and non-string names" do
    GreetingRequest.query("  ").status.should eq(422)
    GreetingRequest.json("{").status.should eq(400)
    GreetingRequest.json(%({"name":12})).status.should eq(422)
    GreetingRequest.json("[]").status.should eq(422)
  end
end
