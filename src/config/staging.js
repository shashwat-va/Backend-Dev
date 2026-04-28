module.exports = {
  environmentName: 'staging',
  logLevel: 'info',
  dbName: 'transactions_staging',
  sslRequired: true,
  apiBaseUrl: process.env.API_BASE_URL || 'https://staging-api.example.com',
  featureFlags: {
    enableNewRouting: true
  }
};
