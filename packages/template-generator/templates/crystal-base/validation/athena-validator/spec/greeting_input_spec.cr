require "spec"
require "../src/greeting_input"

describe GreetingInput do
  it "accepts a name of up to 80 characters" do
    GreetingInput.validate!("x" * 80).should eq("x" * 80)
  end

  it "reports Athena Validator violations" do
    expect_raises(ArgumentError, "name: This value should not be blank.") { GreetingInput.validate!("") }
    expect_raises(ArgumentError, "name: This value is too long. It should have 80 characters or less.") do
      GreetingInput.validate!("x" * 81)
    end
  end
end
