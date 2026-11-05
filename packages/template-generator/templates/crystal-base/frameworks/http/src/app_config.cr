module AppConfig
  MAX_BODY_BYTES = 4096

  def self.port : Int32
    value = ENV.fetch("PORT", "3000")
    port = value.to_i?
    unless port && (1..65535).includes?(port) && port.to_s == value
      STDERR.puts "PORT must be an integer between 1 and 65535"
      exit 2
    end
    port
  end

  def self.host : String
    ENV.fetch("HOST", "127.0.0.1")
  end

  def self.allowed_origin?(origin : String) : Bool
    ENV.fetch("CORS_ORIGIN", "").split(",").map(&.strip).includes?(origin)
  end
end
