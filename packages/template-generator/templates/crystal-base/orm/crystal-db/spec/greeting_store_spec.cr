require "spec"
require "file_utils"

database_path = File.tempname("greetings", ".sqlite3")
ENV["DATABASE_URL"] = "sqlite3://#{database_path}"

require "../src/greeting_store"

Spec.after_suite { FileUtils.rm_rf(database_path) }

describe GreetingStore do
  it "stores validated names and lists the newest first" do
    GreetingStore.create(%({"name":"Ada"})).status.should eq(201)
    GreetingStore.create(%({"name":" Crystal "})).status.should eq(201)
    JSON.parse(GreetingStore.list.body)["greetings"].as_a.map(&.as_s).should eq(["Crystal", "Ada"])
  end

  it "rejects invalid names without writing them" do
    GreetingStore.create(%({"name":"  "})).status.should eq(422)
    GreetingStore.create("{").status.should eq(400)
    JSON.parse(GreetingStore.list.body)["greetings"].as_a.size.should eq(2)
  end
end
