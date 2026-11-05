module Greetings
  class GreetingRecord < Marten::Model
    db_table "greetings"

    field :id, :big_int, primary_key: true, auto: true
    field :name, :string, max_size: 80
  end
end
