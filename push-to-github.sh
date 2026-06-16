#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="${1:-worldcup-predictor}"
VISIBILITY="${2:-private}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required." >&2
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required for one-command push." >&2
  echo "Manual path: create an empty repo on GitHub, then run the git remote commands printed in README.md." >&2
  exit 1
fi

if [ ! -d .git ]; then
  git init
fi

git add .
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "Initial worldcup predictor platform"
fi

git branch -M main

if gh repo view "$REPO_NAME" >/dev/null 2>&1; then
  echo "Repo already exists: $REPO_NAME"
else
  gh repo create "$REPO_NAME" "--$VISIBILITY" --source=. --remote=origin --push
  exit 0
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  OWNER="$(gh api user --jq .login)"
  git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"
fi

git push -u origin main
