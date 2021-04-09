"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const friendRoutesAuth_1 = __importDefault(require("./routes/friendRoutesAuth"));
const app = express_1.default();
const errors_1 = require("./errors/errors");
//Simple cors
//import myCors from "./middleware/myCors";
//app.use(myCors)
//Cors package
//const Cors = require("cors"); 
//App.use(Cors());
//Logger -------------------------
const logger_1 = __importStar(require("./middleware/logger"));
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev";
app.use(require("morgan")(morganFormat, { stream: logger_1.stream }));
logger_1.default.log("info", "Server started");
// Simple logger
//app.use(simpleLogger);
app.use(express_1.default.static(path_1.default.join(process.cwd(), "public")));
app.use("/api/friends", friendRoutesAuth_1.default);
//WINSTON/MORGAN-LOGGER (Use ONLY one of them)
// import logger, { stream } from "./middleware/logger";
// const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
// app.use(require("morgan")(morganFormat, { stream }));
// app.set("logger", logger) 
//The line above sets the logger as a global key on the application object
//You can now use it from all your middlewares like this req.app.get("logger").log("info","Message")
//Level can be one of the following: error, warn, info, http, verbose, debug, silly
//Level = "error" will go to the error file in production
//----------------------------------------------
// Default 404 handlers for api-requests
app.use("/api", (req, res, next) => {
    res.status(404).json({ errorCode: 404, msg: "not found" });
});
// Makes JSON error-response for ApiErrors, otherwise pass on to default error handleer
app.use((err, req, res, next) => {
    if (err instanceof (errors_1.ApiError)) {
        res.status(err.errorCode).json({ errorCode: 404, msg: err.message });
    }
    else {
        next(err);
    }
});
exports.default = app;
//# sourceMappingURL=app.js.map