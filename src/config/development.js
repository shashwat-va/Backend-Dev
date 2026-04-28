module.exports = {
  environmentName: 'development',
  logLevel: 'debug',
  dbName: 'transactions_dev',
  sslRequired: false,
  apiBaseUrl: process.env.API_BASE_URL || 'https://dev-api.example.com',
  featureFlags: {
    enableNewRouting: true
  }
};
