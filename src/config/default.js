module.exports = {
  appName: 'Transaction Processing System',
  port: parseInt(process.env.PORT, 10) || 3000,
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
  logLevel: process.env.LOG_LEVEL || 'info',
  sslRequired: process.env.SSL_REQUIRED === 'true',
  auditLogging: process.env.AUDIT_LOGGING !== 'false',
  featureFlags: {
    enableNewRouting: process.env.FEATURE_FLAG_NEW_ROUTING === 'true'
  },
  healthCheckIntervalMs: 300000,
  db: {
    uri: process.env.MONGODB_URI || '',
    backupRetentionDays: parseInt(process.env.DB_BACKUP_RETENTION_DAYS, 10) || 30
  },
  maintenanceWindow: {
    days: ['Saturday', 'Sunday'],
    startHour: 2,
    endHour: 6
  }
};
