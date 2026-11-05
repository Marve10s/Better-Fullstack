require "json"
require "securerandom"
require "sidekiq"

module BetterFullstack
  module Jobs
    QUEUE = ENV.fetch("JOBS_QUEUE", "default")
    RESULT_TTL_SECONDS = 3600
    REDIS = { url: ENV.fetch("JOBS_REDIS_URL", "redis://127.0.0.1:6379/1") }.freeze

    Sidekiq.configure_client { |config| config.redis = REDIS }
    Sidekiq.configure_server { |config| config.redis = REDIS }

    class GreetingJob
      include Sidekiq::Job
      sidekiq_options queue: QUEUE

      def perform(id, name)
        Jobs.store(id, "status" => "done", "greeting" => "Hello, #{name}!")
      end
    end

    def self.available?
      Sidekiq.redis { |connection| connection.call("PING") } == "PONG"
    rescue RedisClient::ConnectionError
      false
    end

    def self.create(name)
      id = SecureRandom.uuid
      store(id, "status" => "queued")
      GreetingJob.perform_async(id, name)
      [202, { "id" => id, "status" => "queued" }]
    rescue RedisClient::ConnectionError
      [503, { "error" => "job_queue_unavailable" }]
    end

    def self.find(id)
      result = Sidekiq.redis { |connection| connection.call("GET", key(id)) }
      result ? [200, JSON.parse(result).merge("id" => id)] : [404, { "error" => "not_found" }]
    rescue RedisClient::ConnectionError
      [503, { "error" => "job_queue_unavailable" }]
    end

    def self.store(id, value)
      Sidekiq.redis { |connection| connection.call("SET", key(id), JSON.generate(value), "EX", RESULT_TTL_SECONDS) }
    end

    def self.key(id)
      "better-fullstack:job:#{id}"
    end
  end
end
