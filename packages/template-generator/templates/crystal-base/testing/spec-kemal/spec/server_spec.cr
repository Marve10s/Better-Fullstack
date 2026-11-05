ENV["KEMAL_ENV"] = "test"

require "spec-kemal"
require "../src/server"

describe "Kemal routes" do
  it "reports health as JSON" do
    get "/health"
    response.status_code.should eq(200)
    response.headers["Content-Type"].should start_with("application/json")
    JSON.parse(response.body)["status"].as_s.should eq("ok")
  end

  it "greets by query and rejects a blank name" do
    get "/api/hello?name=Ada"
    JSON.parse(response.body)["message"].as_s.should eq("Hello, Ada!")
    get "/api/hello?name=%20"
    response.status_code.should eq(422)
  end

  it "echoes a posted name and rejects malformed JSON" do
    headers = HTTP::Headers{"Content-Type" => "application/json"}
    post "/api/echo", headers, %({"name":"Ada"})
    JSON.parse(response.body)["message"].as_s.should eq("Hello, Ada!")
    post "/api/echo", headers, "{"
    response.status_code.should eq(400)
  end
end
