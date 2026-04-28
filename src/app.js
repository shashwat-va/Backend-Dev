const express = require('express');
const config = require('./config');
const logger = require('./logger');
const healthRouter = require('./routes/health');
const transactionsRouter = require('./routes/transactions');
const monitoringRouter = require('./routes/monitoring');
const metrics = require('./monitoring/metrics');

const app = express();
app.use(express.json());
app.use(metrics.middleware);

app.use('/health', healthRouter);
app.use('/metrics', metrics.metricsEndpoint);
app.use('/monitoring', monitoringRouter);
app.use('/api/transactions', transactionsRouter);

app.get('/', (req, res) => {
  res.json({
    service: config.appName,
    environment: config.environment,
    uptimeSeconds: process.uptime().toFixed(0)
  });
});

app.use((err, req, res, next) => {
  logger.error('Unhandled application error', { message: err.message, stack: err.stack });
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
