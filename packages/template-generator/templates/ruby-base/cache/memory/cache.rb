require "active_support"
require "active_support/cache"
require "time"

module BetterFullstack
  module Cache
    KEY = "better-fullstack:cache-demo"
    TTL_SECONDS = 30
    STORE = ActiveSupport::Cache::MemoryStore.new(size: 8 * 1024 * 1024)

    def self.available?
      true
    end

    def self.fetch(key, ttl:)
      cached = STORE.read(key)
      return [cached, true] unless cached.nil?

      value = yield
      STORE.write(key, value, expires_in: ttl)
      [value, false]
    end

    def self.delete(key)
      STORE.delete(key)
    end

    def self.demo
      value, cached = fetch(KEY, ttl: TTL_SECONDS) { { "computed_at" => Time.now.utc.iso8601(6) } }
      [200, { value: value, cached: cached }]
    end
  end
end
