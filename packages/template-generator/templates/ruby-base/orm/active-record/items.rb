require_relative "db"

module BetterFullstack
  class Item < ActiveRecord::Base
    validates :name, presence: true, length: { maximum: 80 }
  end

  module Items
    def self.all
      Item.with_connection { Item.order(:id).map { |item| serialize(item) } }
    end

    def self.create(name)
      Item.with_connection { serialize(Item.create!(name: name)) }
    end

    def self.delete_all
      Item.with_connection { Item.delete_all }
    end

    def self.serialize(item)
      { "id" => item.id, "name" => item.name }
    end
  end
end
