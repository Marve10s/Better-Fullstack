require "jwt"

module BetterFullstack
  class Auth
    CURRENT_USER = "better_fullstack.current_user"
    ALGORITHM = "HS256"
    ISSUER = ENV.fetch("JWT_ISSUER", "better-fullstack")
    AUDIENCE = ENV.fetch("JWT_AUDIENCE", "better-fullstack-api")

    def self.secret
      ENV.fetch("JWT_SECRET") do
        raise KeyError, "JWT_SECRET is required when RACK_ENV=production" if ENV["RACK_ENV"] == "production"

        "development-only-jwt-secret-change-me"
      end
    end

    def self.issue(subject, expires_in: 900)
      now = Time.now.to_i
      JWT.encode({ sub: subject, iss: ISSUER, aud: AUDIENCE, iat: now, exp: now + expires_in }, secret, ALGORITHM)
    end

    def self.verify(token)
      payload, = JWT.decode(
        token, secret, true,
        algorithm: ALGORITHM, iss: ISSUER, verify_iss: true, aud: AUDIENCE, verify_aud: true,
        required_claims: ["sub", "exp", "iat"]
      )
      payload
    rescue JWT::DecodeError
      nil
    end

    def initialize(app)
      @app = app
      self.class.secret
    end

    def call(env)
      token = env["HTTP_AUTHORIZATION"].to_s[/\ABearer (.+)\z/, 1]
      payload = token && self.class.verify(token)
      env[CURRENT_USER] = payload && { "id" => payload["sub"] }
      @app.call(env)
    end
  end
end
