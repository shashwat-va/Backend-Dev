# Incident Response Plan

## Purpose
Provide a repeatable incident response workflow for production outages and compliance events.

## Team Roles

- Incident Commander: coordinates response and communications.
- Technical Lead: investigates application and infrastructure issues.
- QA Representative: verifies service recovery.
- Security Auditor: reviews compliance impact.

## Incident Workflow

1. Detect incident via automated alert from health check or monitoring.
2. Open an incident ticket and notify stakeholders.
3. Validate the issue using `/health`, `/metrics`, and log output.
4. Identify whether the failure is application, database, or infrastructure related.
5. Execute remediation:
   - Restart IIS application pool
   - Roll back to last known good release
   - Restore production database snapshot if needed
6. Confirm service recovery and close the incident.

## Communication

- Use the incident channel and status page for updates.
- Document every action taken, including timestamps and personnel.

## Post-Incident Review

- Review root cause and deploy logs.
- Evaluate whether the rollback procedure executed cleanly.
- Update documentation, alert rules, and dashboards.
