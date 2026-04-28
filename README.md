# Transaction Processing System

A Node.js transaction processing system built for development, staging, and production environments with environment isolation, monitoring, and deployment automation.

## Overview

- Development and staging deploy to Heroku.
- Production deploys to IIS on-premises.
- Each environment uses a separate MongoDB Atlas cluster.
- Environment-specific configuration is controlled with environment variables.
- Health checks run automatically and performance metrics are exposed via Prometheus-compatible endpoints.

## Key Features

- `GET /health` health check endpoint
- `GET /metrics` Prometheus metrics
- `GET /monitoring` monitoring dashboard
- Environment-based logging levels
- Automated deployment scripts for dev, staging, and production
- Rollback and incident response documentation

## Setup

1. Copy the environment template for the target environment:

```bash
cp .env.example .env.development
cp .env.example .env.staging
cp .env.example .env.production
```

2. Populate the environment-specific variables.

3. Install dependencies:

```bash
npm install
```

4. Start locally:

```bash
npm run dev
```

## Deployment

- Development: `scripts/deploy-dev.sh`
- Staging: `scripts/deploy-staging.sh`
- Production: `scripts/deploy-prod.ps1`

## Health Checks

The application exposes `/health` and `/metrics` endpoints. Use a scheduler to run `npm run healthcheck` every 5 minutes.

## Backup Policy

Production MongoDB backups are configured as daily snapshots with a 30-day retention policy in MongoDB Atlas.

## Notes

This repository contains environment-specific configuration in `src/config`, separate runtime settings for each environment, and deployment automation scripts for compliance control.
