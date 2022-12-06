import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const transport = new DailyRotateFile({
  filename: "aguia-real-%DATE%.log",
  dirname: "logs",
  datePattern: "d",
  maxSize: "20m",
  maxFiles: "7d",
});

transport.on("rotate", function (oldFile, newFile) {
  logger.info({
    evaluation: "New file created!",
    timestamp: new Date().toISOString(),
  });
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({
      stack: true,
    }),
    format.splat(),
    format.json()
  ),
  transports: [
    transport,
    new transports.Console(),
    new transports.File({
      filename: "aguia-real.err",
      dirname: "logs",
      level: "error",
    }),
  ],
});

export default logger;
