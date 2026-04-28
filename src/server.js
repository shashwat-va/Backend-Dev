const path = require('path');
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`) });
}

const logger = require('./logger');
const config = require('./config');
const { connectDb } = require('./db/connection');
const app = require('./app');

const startServer = async () => {
  try {
    await connectDb();
    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port} in ${config.environment} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

startServer();
