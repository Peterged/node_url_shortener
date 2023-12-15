import winston from 'winston';

const {
  combine, timestamp, json, printf,
} = winston.format;

// Timestamp Declaration
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '../../info.log', level: 'info' }),
    new winston.transports.File({ filename: '../../debug.log', level: 'debug' }),
    new winston.transports.File({ filename: '../../http.log', level: 'http' }),
    new winston.transports.File({ filename: '../../error.log', level: 'error' }),
    new winston.transports.File({ filename: '../../warn.log', level: 'warn' }),
    new winston.transports.File({ filename: '../../silly.log', level: 'silly' }),
  ],
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({
      currentTimestamp, level, message, ...data
    }: winston.Logform.TransformableInfo): string => {
      const response = {
        currentTimestamp,
        level,
        message,
        data, // metadata
      };
      return JSON.stringify(response);
    }),
  ),
});

const formatHTTPLoggerResponse = (
  req: Request,
  res: Response,
) => ({
  request: {
    headers: req.headers,
    url: req.url,
    method: req.method,
    body: req.body,
  },
  response: {
    statusCode: res.status,
    body: res.body,
  },
});

export default logger;
export { formatHTTPLoggerResponse };
// export { logger, formatHTTPLoggerResponse }
