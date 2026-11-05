require "mail"
require "uri"

module BetterFullstack
  module Mailer
    FROM = ENV.fetch("MAIL_FROM", "Better Fullstack <noreply@example.com>")
    SMTP = {
      address: ENV.fetch("SMTP_HOST", "127.0.0.1"),
      port: Integer(ENV.fetch("SMTP_PORT", "1025"), 10),
      user_name: ENV["SMTP_USERNAME"],
      password: ENV["SMTP_PASSWORD"],
      authentication: ENV["SMTP_USERNAME"] ? :plain : nil,
      open_timeout: 5,
      read_timeout: 5
    }.compact.freeze

    Mail.defaults do
      ENV["RACK_ENV"] == "test" ? delivery_method(:test) : delivery_method(:smtp, SMTP)
    end

    def self.deliver_welcome(to)
      raise ArgumentError, "invalid recipient" unless URI::MailTo::EMAIL_REGEXP.match?(to)

      message = Mail.new do
        from FROM
        to to
        subject "Welcome"
        body "Hello, #{to}! Your Better Fullstack service can send email."
      end
      message.deliver!
      message.message_id
    end
  end
end
