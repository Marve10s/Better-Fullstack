require "spec"

ENV["AUTH_USERNAME"] = "demo"
ENV["AUTH_PASSWORD"] = "correct horse battery staple"

require "../src/token_auth"

describe TokenAuth do
  it "issues a token that identifies the signed-in user" do
    login = TokenAuth.login(%({"username":"demo","password":"correct horse battery staple"}))
    login.status.should eq(200)
    token = JSON.parse(login.body)["token"].as_s
    me = TokenAuth.current_user("Bearer #{token}")
    me.status.should eq(200)
    JSON.parse(me.body)["username"].as_s.should eq("demo")
  end

  it "rejects wrong passwords, missing tokens, tampered tokens, and expired tokens" do
    TokenAuth.login(%({"username":"demo","password":"wrong"})).status.should eq(401)
    TokenAuth.login("{").status.should eq(401)
    TokenAuth.current_user(nil).status.should eq(401)
    TokenAuth.current_user("Bearer not-a-token").status.should eq(401)
    expired = JWT.encode({"sub" => "demo", "exp" => (Time.utc - 1.minute).to_unix}, TokenAuth::SECRET, JWT::Algorithm::HS256)
    TokenAuth.current_user("Bearer #{expired}").status.should eq(401)
    forged = JWT.encode({"sub" => "demo", "exp" => (Time.utc + 1.minute).to_unix}, "other-secret", JWT::Algorithm::HS256)
    TokenAuth.current_user("Bearer #{forged}").status.should eq(401)
  end
end
