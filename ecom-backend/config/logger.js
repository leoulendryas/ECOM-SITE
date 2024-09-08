const winston = require('winston');
const path = require('path');

// Define log formats
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info', // Log level ('info', 'warn', 'error', etc.)
  format: logFormat,
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new winston.transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    // Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
    // Log to the console as well
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    })
  ],
});

// If we're in development, log everything to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Stream to use with morgan
logger.stream = {
  write: (message) => {
    // Morgan outputs request logs with a newline, so we trim the newline
    logger.info(message.trim());
  }
};

module.exports = logger;
