require "crypto/subtle"
require "json"

module AuthCredentials
  def self.authenticate(raw_body : String) : String?
    payload = JSON.parse(raw_body).as_h?
    username = payload.try(&.["username"]?).try(&.as_s?)
    password = payload.try(&.["password"]?).try(&.as_s?)
    expected = ENV["AUTH_PASSWORD"]?
    return unless username && password && expected && !expected.empty?
    expected_username = ENV.fetch("AUTH_USERNAME", "demo")
    valid = Crypto::Subtle.constant_time_compare(username, expected_username) & Crypto::Subtle.constant_time_compare(password, expected)
    username if valid
  rescue JSON::ParseException
    nil
  end
end
