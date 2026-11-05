require "semantic_logger"

module BetterFullstack
  class RequestLogger
    SemanticLogger.default_level = ENV.fetch("LOG_LEVEL", "info").to_sym
    if ENV["LOG_PATH"]
      SemanticLogger.add_appender(file_name: ENV["LOG_PATH"], formatter: :json)
    else
      SemanticLogger.add_appender(io: $stdout, formatter: :json)
    end

    def self.logger
      @logger ||= SemanticLogger["http"]
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
