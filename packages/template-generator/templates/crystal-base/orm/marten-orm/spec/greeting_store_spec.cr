require "./spec_helper"

describe GreetingStore do
  it "stores validated names and lists the newest first" do
    GreetingStore.create(%({"name":"Ada"})).status.should eq(201)
    GreetingStore.create(%({"name":" Crystal "})).status.should eq(201)
    JSON.parse(GreetingStore.list.body)["greetings"].as_a.map(&.as_s).should eq(["Crystal", "Ada"])
  end

  it "rejects invalid names without writing them" do
    GreetingStore.create(%({"name":"  "})).status.should eq(422)
    GreetingStore.create("{").status.should eq(400)
    JSON.parse(GreetingStore.list.body)["greetings"].as_a.should be_empty
  end
end
