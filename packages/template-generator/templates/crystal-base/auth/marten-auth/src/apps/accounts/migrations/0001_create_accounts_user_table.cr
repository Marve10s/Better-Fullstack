class Migration::Accounts::V0001 < Marten::Migration
  def plan
    create_table :accounts_user do
      column :id, :big_int, primary_key: true, auto: true
      column :email, :string, max_size: 254, unique: true
      column :password, :string, max_size: 128
      column :created_at, :date_time
      column :updated_at, :date_time
    end
  end
end
