require "spectator"
require "../src/greeting"

Spectator.describe Greeting do
  subject(message) { JSON.parse(Greeting.response(name))["message"].as_s }

  context "with surrounding whitespace" do
    let(name) { "  Ada  " }

    it "greets the trimmed name" do
      expect(message).to eq("Hello, Ada!")
    end
  end

  sample ["", "   ", "x" * 81] do |invalid|
    it "rejects #{invalid.size} characters" do
      expect { Greeting.response(invalid) }.to raise_error(ArgumentError)
    end
  end
end
