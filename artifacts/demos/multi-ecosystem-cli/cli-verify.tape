Output artifacts/demos/multi-ecosystem-cli/demo-cli-verify.mp4

Require "zsh"

Set Shell "zsh"
Set FontFamily "Menlo"
Set FontSize 21
Set Width 1320
Set Height 820
Set Padding 24
Set Framerate 30
Set PlaybackSpeed 1.0
Set TypingSpeed 12ms
Set Theme "Catppuccin Macchiato"
Set WindowBar "Colorful"
Set BorderRadius 12

Type "cd /Users/ibrahime/Documents/Better-Fullstack/artifacts/demos/multi-ecosystem-cli"
Enter
Sleep 500ms

Hide
Type "rm -rf verify-project"
Enter
Sleep 300ms
Show

Type "/Users/ibrahime/.bun/bin/bun ../../../apps/cli/dist/cli.mjs verify-project --part frontend:typescript:next --part backend:go:gin --part database:universal:postgres --part backend.orm:go:gorm --addons none --server-deploy railway --ui-library none --go-logging zap --ai-docs none --no-git --package-manager bun --no-install --verify"
Enter
Sleep 18s

Hide
Type "rm -rf verify-project"
Enter
Sleep 300ms
Show
