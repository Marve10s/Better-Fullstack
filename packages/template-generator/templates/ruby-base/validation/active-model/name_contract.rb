require "active_model"

module BetterFullstack
  class NameContract
    include ActiveModel::Validations

    attr_reader :payload, :name

    validate :payload_is_only_a_string_name
    validates :name, length: { in: 1..80, message: "name_length_must_be_1_to_80" }, if: -> { errors.empty? }

    def self.error_for(payload)
      contract = new(payload)
      contract.errors.first.message unless contract.valid?
    end

    def initialize(payload)
      @payload = payload
      @name = payload["name"].strip if payload.is_a?(Hash) && payload["name"].is_a?(String)
    end

    private

    def payload_is_only_a_string_name
      errors.add(:name, "name_must_be_a_string") unless name && payload.keys == ["name"]
    end
  end
end
