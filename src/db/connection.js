const mongoose = require('mongoose');
const logger = require('../logger');
const config = require('../config');

let lastConnectionState = 'disconnected';

const connectDb = async () => {
  if (!config.db.uri) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  mongoose.connection.on('connected', () => {
    lastConnectionState = 'connected';
    logger.info(`MongoDB connected (${config.environmentName})`);
  });

  mongoose.connection.on('disconnected', () => {
    lastConnectionState = 'disconnected';
    logger.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (error) => {
    lastConnectionState = 'error';
    logger.error('MongoDB connection error', { error: error.message });
  });

  await mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return mongoose.connection;
};

const getDbStatus = () => {
  switch (mongoose.connection.readyState) {
    case 0:
      return 'disconnected';
    case 1:
      return 'connected';
    case 2:
      return 'connecting';
    case 3:
      return 'disconnecting';
    default:
      return lastConnectionState;
  }
};

module.exports = {
  connectDb,
  getDbStatus
};
