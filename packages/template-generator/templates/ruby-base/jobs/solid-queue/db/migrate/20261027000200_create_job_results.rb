class CreateJobResults < ActiveRecord::Migration[8.1]
  def change
    create_table :job_results, id: :string do |t|
      t.string :greeting, null: false
      t.timestamps
    end
  end
end
