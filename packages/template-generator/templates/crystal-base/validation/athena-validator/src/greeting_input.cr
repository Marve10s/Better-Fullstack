require "athena-validator"

class GreetingInput
  include AVD::Validatable

  @[Assert::NotBlank]
  @[Assert::Length(..80)]
  getter name : String

  def initialize(@name : String); end

  def self.validate!(name : String) : String
    violations = AVD.validator.validate(new(name))
    raise ArgumentError.new("name: #{violations.first.message}") unless violations.empty?
    name
  end
end
