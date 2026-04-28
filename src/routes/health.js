const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const config = require('../config');

router.get('/', (req, res) => {
  const status = {
    status: 'ok',
    environment: config.environment,
    uptimeSeconds: process.uptime().toFixed(0),
    database: db.getDbStatus(),
    sslRequired: config.sslRequired,
    featureFlags: config.featureFlags,
    timestamp: new Date().toISOString()
  };
  res.json(status);
});

module.exports = router;
