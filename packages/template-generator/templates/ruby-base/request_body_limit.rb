require "json"
require "stringio"

module BetterFullstack
  class RequestBodyLimit
    MAX_BYTES = 16_384

    def initialize(app, allowed_origins)
      @app = app
      @allowed_origins = allowed_origins
    end

    def call(env)
      return oversized(env) if env["CONTENT_LENGTH"].to_i > MAX_BYTES

      if input = env["rack.input"]
        raw = input.read(MAX_BYTES + 1) || ""
        return oversized(env) if raw.bytesize > MAX_BYTES

        env["rack.input"] = StringIO.new(raw)
      end
      @app.call(env)
    end

    def oversized(env)
      body = JSON.generate(error: "body_too_large")
      headers = { "content-type" => "application/json", "content-length" => body.bytesize.to_s }
      origin = env["HTTP_ORIGIN"]
      if origin && @allowed_origins.call.include?(origin)
        headers["access-control-allow-origin"] = origin
        headers["vary"] = "Origin"
      end
      [413, headers, [body]]
    end
  end
end
