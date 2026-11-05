require_relative "db"

module BetterFullstack
  class ItemsRelation < ROM::Relation[:sql]
    schema(:items) do
      attribute :id, ROM::SQL::Types::Serial
      attribute :name, ROM::SQL::Types::String
    end

    def ordered
      order(:id)
    end
  end

  class ItemRepo < ROM::Repository[:items]
    commands :create
  end

  Database::CONFIGURATION.register_relation(ItemsRelation)
  CONTAINER = ROM.container(Database::CONFIGURATION)

  module Items
    REPO = ItemRepo.new(CONTAINER)

    def self.all
      REPO.items.ordered.to_a.map { |item| serialize(item) }
    end

    def self.create(name)
      serialize(REPO.create(name: name))
    end

    def self.delete_all
      REPO.items.delete
    end

    def self.serialize(item)
      { "id" => item[:id], "name" => item[:name] }
    end
  end
end
