require "json_schemer"

module BetterFullstack
  module NameContract
    PAYLOAD = JSONSchemer.schema({
      "type" => "object",
      "required" => ["name"],
      "additionalProperties" => false,
      "properties" => { "name" => { "type" => "string" } }
    })
    NAME = JSONSchemer.schema({ "type" => "string", "minLength" => 1, "maxLength" => 80 })

    def self.error_for(payload)
      return "name_must_be_a_string" unless PAYLOAD.valid?(payload)

      "name_length_must_be_1_to_80" unless NAME.valid?(payload["name"].strip)
    end
  end
end
