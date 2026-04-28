module.exports = {
  environmentName: 'production',
  logLevel: 'error',
  dbName: 'transactions_prod',
  sslRequired: true,
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
  featureFlags: {
    enableNewRouting: false
  }
};
