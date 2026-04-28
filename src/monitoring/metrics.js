const client = require('prom-client');
const db = require('../db/connection');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const requestCounter = new client.Counter({
  name: 'app_request_count',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const responseTimeHistogram = new client.Histogram({
  name: 'app_response_time_seconds',
  help: 'Response time in seconds',
  labelNames: ['method', 'route']
});

const dbConnectionGauge = new client.Gauge({
  name: 'app_db_connection_status',
  help: 'Database connection state encoded as 0=disconnected, 1=connected, 2=connecting, 3=disconnecting'
});

register.registerMetric(requestCounter);
register.registerMetric(responseTimeHistogram);
register.registerMetric(dbConnectionGauge);

const updateDbMetric = () => {
  const status = db.getDbStatus();
  const value = { disconnected: 0, connected: 1, connecting: 2, disconnecting: 3 }[status] || 0;
  dbConnectionGauge.set(value);
};

const middleware = (req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds + nanoseconds / 1e9;
    requestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
    responseTimeHistogram.observe({ method: req.method, route: req.path }, duration);
    updateDbMetric();
  });
  next();
};

const metricsEndpoint = async (req, res) => {
  updateDbMetric();
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
};

module.exports = {
  middleware,
  metricsEndpoint,
  register
};
