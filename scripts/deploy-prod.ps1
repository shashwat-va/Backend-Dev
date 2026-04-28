param(
  [switch]$Force
)

function Get-MaintenanceWindow {
  $now = Get-Date
  return ($now.DayOfWeek -in @('Saturday', 'Sunday')) -and ($now.Hour -ge 2) -and ($now.Hour -lt 6)
}

if (-not $Force -and -not (Get-MaintenanceWindow)) {
  Write-Error "Production deployments are only allowed during maintenance windows: Saturday/Sunday 2:00-06:00."
  exit 1
}

$confirmation = Read-Host 'Have QA sign-off and the deployment ticket approved? (yes/no)'
if ($confirmation -ne 'yes') {
  Write-Error 'Production deployment aborted. QA sign-off is required.'
  exit 1
}

Write-Host 'Starting production deployment to IIS...'
Write-Host 'Ensure the target server has the production environment variables set and the web.config file deployed.'
Write-Host 'Deploy your code package to the IIS server using the approved release process.'

Write-Host 'Production deployment script completed. Verify /health and /metrics after deployment.'
