#!/usr/bin/env bash
set -euo pipefail

# Staging deploy for Heroku. Ensure code review approval before running.
heroku git:remote -a transaction-processor-staging || true

echo "Deploying to Heroku staging environment..."
git push heroku HEAD:main

heroku config:set NODE_ENV=staging LOG_LEVEL=info --app transaction-processor-staging

echo "Staging deployment completed. Confirm QA validation in staging before promoting to production."
