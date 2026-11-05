require "action_mailer"
require "uri"

module BetterFullstack
  class WelcomeMailer < ActionMailer::Base
    default from: ENV.fetch("MAIL_FROM", "Better Fullstack <noreply@example.com>")

    self.delivery_method = ENV["RACK_ENV"] == "test" ? :test : :smtp
    self.smtp_settings = {
      address: ENV.fetch("SMTP_HOST", "127.0.0.1"),
      port: Integer(ENV.fetch("SMTP_PORT", "1025"), 10),
      user_name: ENV["SMTP_USERNAME"],
      password: ENV["SMTP_PASSWORD"],
      authentication: ENV["SMTP_USERNAME"] ? :plain : nil,
      open_timeout: 5,
      read_timeout: 5
    }.compact

    def welcome(to)
      mail(to: to, subject: "Welcome") do |format|
        format.text { render plain: "Hello, #{to}! Your Better Fullstack service can send email." }
      end
    end
  end

  module Mailer
    def self.deliver_welcome(to)
      raise ArgumentError, "invalid recipient" unless URI::MailTo::EMAIL_REGEXP.match?(to)

      WelcomeMailer.welcome(to).deliver_now.message_id
    end
  end
end
