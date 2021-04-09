"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const debug = require("debug")("www");
const dbConnector_1 = require("../config/dbConnector");
const PORT = process.env.PORT || 3333;
(function connectToDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield dbConnector_1.DbConnector.connect();
        const db = connection.db(process.env.DB_NAME);
        app_1.default.set("db", db); //Make the database available to the rest of the application
        app_1.default.set("db-type", "REAL"); //So relevant places can log the database used
        app_1.default.listen(PORT, () => debug(`Server started, listening on PORT: ${PORT}`));
        // Replace line above with this one if you wan't to use the Winston logger (see app.ts)
        //app.listen(PORT, () => app.get("logger").log("info", `Server started, listening on PORT: ${PORT}`))
    });
})();
//# sourceMappingURL=www.js.map