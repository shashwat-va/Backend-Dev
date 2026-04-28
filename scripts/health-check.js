const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });
}

const config = require('../src/config');
const target = process.env.HEALTH_CHECK_URL || `http://localhost:${config.port}/health`;

const runHealthCheck = async () => {
  try {
    const response = await axios.get(target, { timeout: 10000 });
    console.log(`Health check passed: ${response.status}`);
    console.log(response.data);
  } catch (error) {
    console.error('Health check failed:', error.message);
    process.exit(1);
  }
};

runHealthCheck();
