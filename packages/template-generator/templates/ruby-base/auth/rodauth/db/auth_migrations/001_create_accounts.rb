Sequel.migration do
  change do
    create_table(:accounts) do
      primary_key :id
      String :email, null: false, unique: true
      String :password_hash, null: false
    end
  end
end
