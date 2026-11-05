require_relative "db"

module BetterFullstack
  class Item < Sequel::Model(Database::CONNECTION[:items])
  end

  module Items
    def self.all
      Item.order(:id).map { |item| serialize(item) }
    end

    def self.create(name)
      serialize(Item.create(name: name))
    end

    def self.delete_all
      Item.dataset.delete
    end

    def self.serialize(item)
      { "id" => item.id, "name" => item.name }
    end
  end
end
