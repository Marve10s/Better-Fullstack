require_relative "db"
require "active_job/railtie"
require "solid_queue"

module BetterFullstack
  class JobResult < ActiveRecord::Base
  end

  class GreetingJob < ActiveJob::Base
    queue_as :default

    def perform(name)
      JobResult.create!(id: job_id, greeting: "Hello, #{name}!")
    end
  end

  module Jobs
    def self.available?
      true
    end

    def self.create(name)
      job = GreetingJob.perform_later(name)
      [202, { "id" => job.job_id, "status" => "queued" }]
    end

    def self.find(id)
      result = JobResult.find_by(id: id)
      return [200, { "id" => id, "status" => "done", "greeting" => result.greeting }] if result
      return [200, { "id" => id, "status" => "queued" }] if SolidQueue::Job.exists?(active_job_id: id)

      [404, { "error" => "not_found" }]
    end
  end
end
