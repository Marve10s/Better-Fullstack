require "json"
require "resque"
require "securerandom"

module BetterFullstack
  module Jobs
    QUEUE = ENV.fetch("JOBS_QUEUE", "default")
    RESULT_TTL_SECONDS = 3600

    Resque.redis = ENV.fetch("JOBS_REDIS_URL", "redis://127.0.0.1:6379/1")

    class GreetingJob
      @queue = QUEUE

      def self.perform(id, name)
        Jobs.store(id, "status" => "done", "greeting" => "Hello, #{name}!")
      end
    end

    def self.available?
      Resque.redis.ping == "PONG"
    rescue Redis::BaseConnectionError
      false
    end

    def self.create(name)
      id = SecureRandom.uuid
      store(id, "status" => "queued")
      Resque.enqueue(GreetingJob, id, name)
      [202, { "id" => id, "status" => "queued" }]
    rescue Redis::BaseConnectionError
      [503, { "error" => "job_queue_unavailable" }]
    end

    def self.find(id)
      result = Resque.redis.get(key(id))
      result ? [200, JSON.parse(result).merge("id" => id)] : [404, { "error" => "not_found" }]
    rescue Redis::BaseConnectionError
      [503, { "error" => "job_queue_unavailable" }]
    end

    def self.store(id, value)
      Resque.redis.set(key(id), JSON.generate(value), ex: RESULT_TTL_SECONDS)
    end

    def self.key(id)
      "job:#{id}"
    end
  end
end
