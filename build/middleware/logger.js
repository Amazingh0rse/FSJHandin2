"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json()
});
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} : '${info.level}' ${info.message}`));
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        handleExceptions: true,
        format
    }));
}
else {
    logger.add(new winston_1.default.transports.File({ filename: path_1.default.join('logs', 'error.log'), level: 'error', handleExceptions: true }));
    logger.add(new winston_1.default.transports.File({ filename: path_1.default.join('logs', 'combined.log') }));
}
exports.stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map