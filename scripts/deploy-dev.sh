#!/usr/bin/env bash
set -euo pipefail

# Development deploy for Heroku
heroku git:remote -a transaction-processor-dev || true

echo "Deploying to Heroku development environment..."
git push heroku HEAD:main

echo "Setting environment variables for development..."
heroku config:set NODE_ENV=development LOG_LEVEL=debug --app transaction-processor-dev

echo "Development deployment completed."
