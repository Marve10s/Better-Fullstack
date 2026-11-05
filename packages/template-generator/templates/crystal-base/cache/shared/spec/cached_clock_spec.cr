require "spec"
require "../src/cached_clock"

describe CachedClock do
  it "serves the cached timestamp until the entry expires" do
    CachedClock.store.delete("cached_at")
    first = CachedClock.fetch
    first.status.should eq(200)
    CachedClock.fetch.body.should eq(first.body)

    CachedClock.store.write("cached_at", "stale", expires_in: 1.second)
    JSON.parse(CachedClock.fetch.body)["cached_at"].as_s.should eq("stale")
    sleep 1.1.seconds
    JSON.parse(CachedClock.fetch.body)["cached_at"].as_s.should_not eq("stale")
  end
end
