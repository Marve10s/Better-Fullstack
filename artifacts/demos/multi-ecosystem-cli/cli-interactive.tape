Output artifacts/demos/multi-ecosystem-cli/demo-cli-interactive.mp4

Require "zsh"

Set Shell "zsh"
Set FontFamily "Menlo"
Set FontSize 22
Set Width 1320
Set Height 820
Set Padding 24
Set Framerate 30
Set PlaybackSpeed 1.0
Set TypingSpeed 16ms
Set Theme "Catppuccin Macchiato"
Set WindowBar "Colorful"
Set BorderRadius 12

Type "cd /Users/ibrahime/Documents/Better-Fullstack/apps/cli"
Enter
Sleep 500ms

Type "/Users/ibrahime/.bun/bin/bun dist/cli.mjs multi-eco-demo --dry-run --db-setup none --go-orm gorm --go-api none --go-auth none --go-cli none --go-logging zap --addons none --web-deploy none --server-deploy railway --ai-docs none --no-git --package-manager bun --no-install --ui-library none --css-framework tailwind"
Enter
Sleep 1200ms

# Version channel: Stable
Enter
Sleep 900ms

# Composition mode: Multi ecosystem
Down 1
Enter
Sleep 900ms

# Frontend: Next.js
Down 4
Enter
Sleep 900ms

# Backend ecosystem: Go
Down 1
Enter
Sleep 900ms

# Backend framework: Gin
Enter
Sleep 900ms

# Database: PostgreSQL
Down 1
Enter

Sleep 14s
