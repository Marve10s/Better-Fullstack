require "spec"
require "../src/greeting"

describe Greeting do
  it "parses a greeting as JSON and preserves Unicode" do
    JSON.parse(Greeting.response("  İbrahim  "))["message"].as_s.should eq("Hello, İbrahim!")
  end

  it "rejects blank and oversized names" do
    ["", "   ", "x" * 81].each do |name|
      expect_raises(ArgumentError) { Greeting.response(name) }
    end
  end
end
