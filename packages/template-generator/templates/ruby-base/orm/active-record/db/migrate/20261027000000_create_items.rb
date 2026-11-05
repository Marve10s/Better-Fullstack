class CreateItems < ActiveRecord::Migration[8.1]
  def change
    create_table :items do |t|
      t.string :name, null: false, limit: 80
      t.timestamps
    end
  end
end
