require "json"
require "./greeting_request"

module SessionAuth
  def self.sign_in(request : Marten::HTTP::Request) : GreetingRequest::Result
    payload = JSON.parse(request.body).as_h?
    email = payload.try(&.["username"]?).try(&.as_s?)
    password = payload.try(&.["password"]?).try(&.as_s?)
    user = email && password ? MartenAuth.authenticate(email, password) : nil
    return unauthorized unless user
    MartenAuth.sign_in(request, user)
    GreetingRequest::Result.new(200, {username: user.as(Accounts::User).email!}.to_json)
  rescue JSON::ParseException
    unauthorized
  end

  def self.current_user(request : Marten::HTTP::Request) : GreetingRequest::Result
    user = request.user
    return unauthorized unless user
    GreetingRequest::Result.new(200, {username: user.as(Accounts::User).email!}.to_json)
  end

  def self.unauthorized : GreetingRequest::Result
    GreetingRequest::Result.new(401, {error: "unauthorized"}.to_json)
  end
end
