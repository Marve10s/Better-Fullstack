require "marten"

class GreetingSchema < Marten::Schema
  field :name, :string, max_size: 80
end

module GreetingInput
  def self.validate!(name : String) : String
    schema = GreetingSchema.new(Marten::Schema::DataHash{"name" => name})
    return schema.validated_data["name"].to_s if schema.valid?
    error = schema.errors.first
    raise ArgumentError.new("#{error.field}: #{error.message}")
  end
end
