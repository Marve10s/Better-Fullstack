require "dalli"
require "json"
require "time"

module BetterFullstack
  module Cache
    KEY = "better-fullstack:cache-demo"
    TTL_SECONDS = 30

    def self.client
      @client ||= Dalli::Client.new(
        ENV.fetch("MEMCACHED_SERVERS", "127.0.0.1:11211"),
        serializer: JSON,
        socket_timeout: 1,
        socket_max_failures: 1,
        down_retry_delay: 1
      )
    end

    def self.available?
      client.alive!
      true
    rescue Dalli::DalliError
      false
    end

    def self.fetch(key, ttl:)
      cached = client.get(key)
      return [cached, true] unless cached.nil?

      value = yield
      client.set(key, value, ttl)
      [value, false]
    end

    def self.delete(key)
      client.delete(key)
    end

    def self.demo
      value, cached = fetch(KEY, ttl: TTL_SECONDS) { { "computed_at" => Time.now.utc.iso8601(6) } }
      [200, { value: value, cached: cached }]
    rescue Dalli::DalliError
      [503, { error: "cache_unavailable" }]
    end
  end
end
