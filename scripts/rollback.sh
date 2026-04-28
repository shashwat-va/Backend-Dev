#!/usr/bin/env bash
set -euo pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <release-tag-or-commit>"
  exit 1
fi

TARGET=$1

echo "Rolling back to ${TARGET}..."
git fetch --all
git checkout ${TARGET}

echo "Rollback complete. Rebuild and redeploy to the target environment."

echo "Verify /health and /metrics after rollback."
