require "./spec_helper"

describe SessionAuth do
  it "signs in with the stored password, reports the user, and signs out" do
    user = Accounts::User.new(email: "ada@example.com")
    user.set_password("correct horse battery staple")
    user.save!
    client = Marten::Spec.client
    client.get("/api/me").status.should eq(401)
    login = client.post("/api/auth/login", data: %({"username":"ada@example.com","password":"correct horse battery staple"}), content_type: "application/json", secure: true)
    login.status.should eq(200)
    JSON.parse(client.get("/api/me", secure: true).content)["username"].as_s.should eq("ada@example.com")
    client.post("/api/auth/logout", secure: true).status.should eq(204)
    client.get("/api/me", secure: true).status.should eq(401)
  end

  it "rejects a wrong password" do
    user = Accounts::User.new(email: "ada@example.com")
    user.set_password("correct horse battery staple")
    user.save!
    Marten::Spec.client.post("/api/auth/login", data: %({"username":"ada@example.com","password":"wrong"}), content_type: "application/json").status.should eq(401)
  end
end
