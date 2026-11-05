require "spec"
require "../src/greeting_input"

describe GreetingInput do
  it "accepts a name of up to 80 characters" do
    GreetingInput.validate!("x" * 80).should eq("x" * 80)
  end

  it "reports ActiveModel validation errors" do
    expect_raises(ArgumentError, "name is required") { GreetingInput.validate!("") }
    expect_raises(ArgumentError, "name is too long") { GreetingInput.validate!("x" * 81) }
  end
end
