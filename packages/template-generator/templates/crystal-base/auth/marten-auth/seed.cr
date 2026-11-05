require "./src/project"

Marten.setup
email = ENV.fetch("AUTH_USERNAME", "demo@example.com")
password = ENV["AUTH_PASSWORD"]? || abort("Set AUTH_PASSWORD to create the sign-in user")
user = Accounts::User.get(email: email) || Accounts::User.new(email: email)
user.set_password(password)
user.save!
puts "Saved sign-in user #{email}"
