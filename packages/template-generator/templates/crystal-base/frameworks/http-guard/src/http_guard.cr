require "http/server/handler"
require "json"
require "./app_config"

class HttpGuard
  include HTTP::Handler

  def call(context : HTTP::Server::Context)
    response = context.response
    if (origin = context.request.headers["Origin"]?) && AppConfig.allowed_origin?(origin)
      response.headers["Access-Control-Allow-Origin"] = origin
      response.headers["Vary"] = "Origin"
    end
    if body = context.request.body
      buffered = IO::Memory.new
      if IO.copy(body, buffered, AppConfig::MAX_BODY_BYTES + 1) > AppConfig::MAX_BODY_BYTES
        response.status_code = 413
        response.content_type = "application/json"
        response.print({error: "request body too large"}.to_json)
        return
      end
      context.request.body = buffered.rewind
    end
    call_next(context)
  end
end
