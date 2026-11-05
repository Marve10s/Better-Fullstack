Sequel.migration do
  change do
    create_table(:items) do
      primary_key :id
      String :name, null: false, size: 80
      DateTime :created_at, null: false, default: Sequel::CURRENT_TIMESTAMP
    end
  end
end
