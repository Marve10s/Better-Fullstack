require "tasker"

module GreetingJob
  RESULTS = {} of String => String
  LOCK    = Mutex.new

  def self.schedule(id : String, name : String) : Nil
    Tasker.in(10.milliseconds) { LOCK.synchronize { RESULTS[id] = "Hello, #{name}!" } }
  end

  def self.result(id : String) : String?
    LOCK.synchronize { RESULTS[id]? }
  end
end
