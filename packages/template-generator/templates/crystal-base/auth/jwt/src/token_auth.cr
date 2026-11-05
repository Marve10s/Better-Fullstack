require "jwt"
require "./auth_credentials"
require "./greeting_request"

module TokenAuth
  SECRET = ENV.fetch("JWT_SECRET") { Random::Secure.hex(32) }
  TTL    = 1.hour

  def self.login(raw_body : String) : GreetingRequest::Result
    username = AuthCredentials.authenticate(raw_body)
    return unauthorized unless username
    token = JWT.encode({"sub" => username, "exp" => (Time.utc + TTL).to_unix}, SECRET, JWT::Algorithm::HS256)
    GreetingRequest::Result.new(200, {token: token}.to_json)
  end

  def self.current_user(authorization : String?) : GreetingRequest::Result
    token = authorization.try(&.lchop?("Bearer "))
    return unauthorized unless token
    payload, _header = JWT.decode(token, SECRET, JWT::Algorithm::HS256)
    GreetingRequest::Result.new(200, {username: payload["sub"].as_s}.to_json)
  rescue JWT::Error
    unauthorized
  end

  private def self.unauthorized : GreetingRequest::Result
    GreetingRequest::Result.new(401, {error: "unauthorized"}.to_json)
  end
end
