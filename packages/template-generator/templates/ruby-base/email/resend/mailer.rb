require "resend"
require "uri"

module BetterFullstack
  module Mailer
    FROM = ENV.fetch("MAIL_FROM", "Better Fullstack <onboarding@resend.dev>")

    Resend.api_key = ENV.fetch("RESEND_API_KEY", nil)

    def self.deliver_welcome(to)
      raise ArgumentError, "invalid recipient" unless URI::MailTo::EMAIL_REGEXP.match?(to)
      raise "RESEND_API_KEY is not set" unless Resend.api_key

      Resend::Emails.send({
        from: FROM,
        to: [to],
        subject: "Welcome",
        text: "Hello, #{to}! Your Better Fullstack service can send email."
      })[:id]
    end
  end
end
