require "spec"

ENV["AUTH_USERNAME"] = "demo"
ENV["AUTH_PASSWORD"] = "correct horse battery staple"

require "../src/auth_credentials"

describe AuthCredentials do
  it "accepts only the configured username and password" do
    AuthCredentials.authenticate(%({"username":"demo","password":"correct horse battery staple"})).should eq("demo")
    AuthCredentials.authenticate(%({"username":"demo","password":"wrong"})).should be_nil
    AuthCredentials.authenticate(%({"username":"other","password":"correct horse battery staple"})).should be_nil
    AuthCredentials.authenticate(%(["demo"])).should be_nil
    AuthCredentials.authenticate("{").should be_nil
  end

  it "rejects every sign-in while AUTH_PASSWORD is unset" do
    ENV.delete("AUTH_PASSWORD")
    AuthCredentials.authenticate(%({"username":"demo","password":""})).should be_nil
  ensure
    ENV["AUTH_PASSWORD"] = "correct horse battery staple"
  end
end
