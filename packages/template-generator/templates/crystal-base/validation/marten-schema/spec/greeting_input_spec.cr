require "spec"
require "../src/greeting_input"

describe GreetingInput do
  it "returns the stripped name from the schema" do
    GreetingInput.validate!("  Ada  ").should eq("Ada")
  end

  it "rejects missing and oversized names through the schema" do
    expect_raises(ArgumentError, /^name: /) { GreetingInput.validate!("") }
    expect_raises(ArgumentError, /^name: /) { GreetingInput.validate!("x" * 81) }
  end
end
