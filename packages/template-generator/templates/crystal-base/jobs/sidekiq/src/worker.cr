require "sidekiq/cli"
require "./greeting_job"

cli = Sidekiq::CLI.new(ENV["JOBS_QUEUE"]? ? ["-q", ENV["JOBS_QUEUE"], *ARGV] : ARGV)
cli.run(cli.configure { })
