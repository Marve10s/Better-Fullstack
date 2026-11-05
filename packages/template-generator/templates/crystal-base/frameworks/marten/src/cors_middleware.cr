class CorsMiddleware < Marten::Middleware
  def call(request : Marten::HTTP::Request, get_response : Proc(Marten::HTTP::Response)) : Marten::HTTP::Response
    response = get_response.call
    if (origin = request.headers["Origin"]?) && AppConfig.allowed_origin?(origin)
      response.headers["Access-Control-Allow-Origin"] = origin
      response.headers["Vary"] = "Origin"
    end
    response
  end
end
