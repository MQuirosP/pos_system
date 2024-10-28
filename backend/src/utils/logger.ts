import { stringify } from "querystring";
import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file"

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? ` - ${JSON.stringify(meta)}` : "";
        return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
    })
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
    format: logFormat,
    transports: [
        new winston.transports.Console({ level: 'debug'}),
        new DailyRotateFile({
            filename: "logs/error-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "error",
            maxSize: "20m",
            maxFiles: "14d"
        }),
        new DailyRotateFile({
            filename: "logs/combined-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            level: "info",
            maxSize: "20m",
            maxFiles: "14d"
        })
    ],
    exceptionHandlers: [
        new DailyRotateFile({
            filename: "logs/exceptions-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d"
        })
    ],
    rejectionHandlers: [
        new DailyRotateFile({
            filename: "logs/rejections-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d"
        })
    ]
})

export default logger;