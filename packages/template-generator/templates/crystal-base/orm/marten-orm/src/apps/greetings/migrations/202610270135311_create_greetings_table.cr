class Migration::Greetings::V202610270135311 < Marten::Migration
  def plan
    create_table :greetings do
      column :id, :big_int, primary_key: true, auto: true
      column :name, :string, max_size: 80
    end
  end
end
