const { createLogger, format, transports } = require('winston');
const config = require('./config');

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const info = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `${timestamp} [${level.toUpperCase()}] ${message} ${info}`.trim();
    })
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error']
    })
  ],
  exitOnError: false
});

module.exports = logger;
