require "ougai"

module BetterFullstack
  class RequestLogger
    def self.logger
      @logger ||= Ougai::Logger.new(ENV["LOG_PATH"] || $stdout, progname: "http", level: ENV.fetch("LOG_LEVEL", "info"))
    end

    def initialize(app)
      @app = app
    end

    def call(env)
      started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      status, headers, body = @app.call(env)
      duration_ms = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started) * 1000).round(1)
      self.class.logger.info("request", method: env["REQUEST_METHOD"], path: env["PATH_INFO"], status: status, duration_ms: duration_ms)
      [status, headers, body]
    end
  end
end
