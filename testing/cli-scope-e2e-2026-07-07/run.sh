#!/usr/bin/env bash
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
BASE="$ROOT/testing/cli-scope-e2e-2026-07-07"
RUNS="$BASE/runs"
EXPECT_SCRIPT="$BASE/scenario.exp"

rm -rf "$RUNS"
mkdir -p "$RUNS"

pass_count=0
fail_count=0

contains() {
  local file="$1"
  local needle="$2"
  grep -Fq "$(echo "$needle" | tr -d '[:space:]')" "$file"
}

not_contains() {
  local file="$1"
  local needle="$2"
  ! grep -Fq "$(echo "$needle" | tr -d '[:space:]')" "$file"
}

normalize_transcript() {
  local source="$1"
  local dest="$2"
  perl -0pe 's/\e\[[0-9;?]*[ -\/]*[@-~]//g' "$source" | tr -d '[:space:]' > "$dest"
}

run_scenario() {
  local id="$1"
  local label="$2"
  local use_user_agent="$3"
  local workdir="$RUNS/$id"
  local project="cli-scope-$id"
  local transcript="$RUNS/$id.transcript"
  mkdir -p "$workdir"

  if /usr/bin/expect "$EXPECT_SCRIPT" "$id" "$ROOT" "$workdir" "$project" "$transcript" "$use_user_agent" >/dev/null 2>&1; then
    local normalized="$RUNS/$id.normalized"
    normalize_transcript "$transcript" "$normalized"
    if validate_scenario "$id" "$normalized" "$workdir/$project"; then
      echo "PASS $id - $label"
      pass_count=$((pass_count + 1))
      return
    fi
  fi

  echo "FAIL $id - $label"
  echo "  transcript: $transcript"
  fail_count=$((fail_count + 1))
}

validate_scenario() {
  local id="$1"
  local transcript="$2"
  local project_dir="$3"

  case "$id" in
    s1)
      contains "$transcript" "Prefer a visual builder?" &&
        contains "$transcript" "How much do you want to configure?" &&
        contains "$transcript" "Project created" &&
        not_contains "$transcript" "Select payments provider" &&
        not_contains "$transcript" "Select caching solution" &&
        test -f "$project_dir/bts.jsonc"
      ;;
    s2)
      contains "$transcript" "Prefer a visual builder?" &&
        contains "$transcript" "Payments & Email" &&
        contains "$transcript" "Deployment" &&
        contains "$transcript" "Select payments provider" &&
        contains "$transcript" "Select web deployment" &&
        contains "$transcript" "Select server deployment" &&
        not_contains "$transcript" "Select caching solution" &&
        not_contains "$transcript" "Select testing framework" &&
        contains "$transcript" "Project created" &&
        test -f "$project_dir/bts.jsonc"
      ;;
    s3)
      contains "$transcript" "Prefer a visual builder?" &&
        contains "$transcript" "Full" &&
        contains "$transcript" "Project created" &&
        test -f "$project_dir/bts.jsonc"
      ;;
    s4)
      contains "$transcript" "Prefer a visual builder?" &&
        { contains "$transcript" "Opened Web Builder in your browser." || contains "$transcript" "Please visit https://better-fullstack-web.vercel.app/new"; } &&
        not_contains "$transcript" "Select ecosystem"
      ;;
    s5)
      not_contains "$transcript" "Prefer a visual builder?" &&
        contains "$transcript" "How much do you want to configure?" &&
        contains "$transcript" "Project created" &&
        test -f "$project_dir/bts.jsonc"
      ;;
    s6)
      contains "$transcript" "Prefer a visual builder?" &&
        contains "$transcript" "Select project composition" &&
        contains "$transcript" "Select backend ecosystem" &&
        contains "$transcript" "How much do you want to configure?" &&
        contains "$transcript" "Project created" &&
        test -f "$project_dir/bts.jsonc"
      ;;
    s7)
      contains "$transcript" "How much do you want to configure?" &&
        contains "$transcript" "Select Rust web framework" &&
        contains "$transcript" "Project created" &&
        not_contains "$transcript" "Select Rust caching library" &&
        not_contains "$transcript" "Select Rust message queue" &&
        test -f "$project_dir/bts.jsonc" &&
        ! grep -q "tanstack-router" "$project_dir/bts.jsonc"
      ;;
  esac
}

run_scenario s1 "builder panel, Continue in CLI, Core scope skips extras" 1
run_scenario s2 "builder panel, Custom scope asks payments/email and deployment only" 1
run_scenario s3 "builder panel, Full scope completes" 1
run_scenario s4 "builder panel opens Web Builder and exits" 1
run_scenario s5 "no package-manager user agent skips builder but still asks scope" 0
run_scenario s6 "multi-ecosystem Core scope completes" 1
run_scenario s7 "rust ecosystem Core scope skips extras without TS leakage" 1

echo "Summary: $pass_count PASS, $fail_count FAIL"
test "$fail_count" -eq 0
