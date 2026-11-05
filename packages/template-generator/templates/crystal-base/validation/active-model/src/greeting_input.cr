require "active-model"

class GreetingInput < ActiveModel::Model
  include ActiveModel::Validation

  attribute name : String = ""

  validates :name, presence: true, length: {maximum: 80}

  def self.validate!(name : String) : String
    input = new(name: name)
    raise ArgumentError.new(input.errors.first.to_s) unless input.valid?
    input.name
  end
end
