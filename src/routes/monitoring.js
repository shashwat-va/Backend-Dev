const express = require('express');
const router = express.Router();
const metrics = require('../monitoring/metrics');
const config = require('../config');

router.get('/', async (req, res) => {
  const metricsPayload = await metrics.register.metrics();
  const html = `
    <html>
      <head><title>Monitoring Dashboard</title></head>
      <body>
        <h1>Monitoring Dashboard</h1>
        <p>Environment: <strong>${config.environment}</strong></p>
        <p>Service: <strong>${config.appName}</strong></p>
        <p>Metric endpoint: <a href="/metrics">/metrics</a></p>
        <pre>${metricsPayload}</pre>
      </body>
    </html>
  `;
  res.send(html);
});

module.exports = router;
