#!/bin/sh

set -eu

if ! command -v git >/dev/null 2>&1; then
  exit 0
fi

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  exit 0
fi

if ! command -v lefthook >/dev/null 2>&1; then
  exit 0
fi

hooks_path="$(git config --local --get core.hooksPath 2>/dev/null || true)"
default_hooks_path="$(git rev-parse --git-path hooks 2>/dev/null || true)"
repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd -P)"

if [ "$hooks_path" = "/dev/null" ]; then
  printf '%s\n' "Skipping lefthook install because core.hooksPath is disabled."
  exit 0
fi

if [ -n "$hooks_path" ]; then
  case "$hooks_path" in
    "$default_hooks_path"|".git/hooks"|"$repo_root/.git/hooks")
      exec lefthook install --reset-hooks-path
      ;;
    *)
      printf '%s\n' "Skipping lefthook install because core.hooksPath is managed locally at '$hooks_path'."
      exit 0
      ;;
  esac
fi

exec lefthook install
