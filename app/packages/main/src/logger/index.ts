import { app } from "electron";
import winston from "winston";
import { LOG_PATH } from "../utils";

export const logger = winston.createLogger({
    level: app.isPackaged ? 'info' : 'debug',
    transports: [
        app.isPackaged ? new winston.transports.File({ filename: LOG_PATH }) : new winston.transports.Console()
    ]
});
