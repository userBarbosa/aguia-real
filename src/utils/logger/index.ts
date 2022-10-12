import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({
      stack: true
    }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'aguia-real.err',
      dirname: 'logs',
      level: 'error'
    }),
    new transports.File({
      filename: `aguia-real-${new Date().getDay()}.log`,
      dirname: 'logs'
    })
  ]
});

export default logger