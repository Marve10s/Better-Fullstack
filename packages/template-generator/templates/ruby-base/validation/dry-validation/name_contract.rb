require "dry/validation"

module BetterFullstack
  class NameContract < Dry::Validation::Contract
    LENGTH_ERROR = "name_length_must_be_1_to_80"

    json do
      config.validate_keys = true
      required(:name).value(:string)
    end

    rule(:name) do
      key.failure(LENGTH_ERROR) unless (1..80).cover?(value.strip.length)
    end

    def self.error_for(payload)
      return "name_must_be_a_string" unless payload.is_a?(Hash)

      errors = new.call(payload).errors.to_h
      return if errors.empty?

      errors == { name: [LENGTH_ERROR] } ? LENGTH_ERROR : "name_must_be_a_string"
    end
  end
end
