require "json"
require "redis"
require "time"

module BetterFullstack
  module Cache
    KEY = "better-fullstack:cache-demo"
    TTL_SECONDS = 30

    def self.client
      @client ||= Redis.new(
        url: ENV.fetch("REDIS_URL", "redis://127.0.0.1:6379/0"),
        timeout: 1,
        reconnect_attempts: 0
      )
    end

    def self.available?
      client.ping == "PONG"
    rescue Redis::BaseConnectionError
      false
    end

    def self.fetch(key, ttl:)
      cached = client.get(key)
      return [JSON.parse(cached), true] if cached

      value = yield
      client.set(key, JSON.generate(value), ex: ttl)
      [value, false]
    end

    def self.delete(key)
      client.del(key)
    end

    def self.demo
      value, cached = fetch(KEY, ttl: TTL_SECONDS) { { "computed_at" => Time.now.utc.iso8601(6) } }
      [200, { value: value, cached: cached }]
    rescue Redis::BaseConnectionError
      [503, { error: "cache_unavailable" }]
    end
  end
end
