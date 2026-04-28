# Security Best Practices

This document summarizes recommended best practices for password security, session security, JWT security, and authorization.

## Password Security

- Always hash passwords before storing them.
- Use `bcrypt` with at least 10–12 salt rounds.
- Enforce strong password requirements:
  - Minimum length (e.g. 8+ characters)
  - Mixed character types (uppercase, lowercase, numbers, symbols)
  - Avoid common or breached passwords
- Consider password breach checking against known-compromised password databases.

## Session Security

- Use a secure, random session secret.
- Set cookie flags for session cookies:
  - `httpOnly: true`
  - `secure: true` in production
  - `sameSite: 'lax'` or stricter when appropriate
- Implement session expiration and idle timeouts.
- Use HTTPS in production environments.
- Regenerate session IDs after login or privilege changes.

## JWT Security

- Use strong signing keys or asymmetric key pairs.
- Keep access token lifetimes short.
- Implement refresh token rotation and revoke old refresh tokens.
- Store tokens securely, preferably in `HttpOnly` cookies instead of local storage.
- Validate tokens on every request.

## Authorization Best Practices

- Authenticate requests before authorization checks.
- Apply the principle of least privilege.
- Use middleware for consistent authorization enforcement.
- Log authorization failures for auditing and debugging.
- Return generic error messages without leaking sensitive details.

## Notes

This README is intended as a security checklist for developers implementing authentication and authorization features in web applications.