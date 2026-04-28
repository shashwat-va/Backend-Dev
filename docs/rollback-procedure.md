# Rollback Procedure

## Goal
Restore the previous production version within 5 minutes after detecting a failed deployment.

## Steps

1. Identify the last successful deployment commit or release tag.
2. On the production server, stop the application pool or Node process.
3. Checkout the last known good Git commit or restore the previous deployed package.
4. Restart the application and verify the `/health` endpoint returns `ok`.
5. Confirm production metrics return to expected values and audit logs show the rollback event.

## Heroku Rollback (Development / Staging)

```bash
heroku releases:rollback --app transaction-processor-staging
```

## IIS Rollback (Production)

1. Restore the previous package from the approved release archive.
2. Update the IIS site content and ensure `web.config` remains in place.
3. Restart the app pool and validate the health endpoint.

## Validation

- Verify `/health` responds successfully.
- Check `/metrics` for request rate and database status.
- Confirm any alerts are cleared in the monitoring system.
