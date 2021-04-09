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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDbConnector = exports.DbConnector = void 0;
const mongodb_1 = require("mongodb");
const mongodb_memory_server_1 = require("mongodb-memory-server");
/**
 *  Connector which you should use for developement and production
 *  Connection String must be given via process.env.CONNECTION
 */
class DbConnector {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (DbConnector.client) {
                return DbConnector.client;
            }
            const uri = process.env.CONNECTION;
            if (uri === undefined) {
                throw new Error("NO Database Connection available");
            }
            DbConnector.client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
            yield DbConnector.client.connect();
            return DbConnector.client;
        });
    }
    static close() {
        if (DbConnector.client) {
            DbConnector.client.close();
            DbConnector.client = null;
        }
    }
}
exports.DbConnector = DbConnector;
/**
 * In-memory MongoDB which you should use for testing
 */
class InMemoryDbConnector {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (InMemoryDbConnector.client) {
                return InMemoryDbConnector.client;
            }
            const mongod = new mongodb_memory_server_1.MongoMemoryServer();
            const uri = yield mongod.getUri();
            InMemoryDbConnector.client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
            yield InMemoryDbConnector.client.connect();
            return InMemoryDbConnector.client;
        });
    }
}
exports.InMemoryDbConnector = InMemoryDbConnector;
//# sourceMappingURL=dbConnector.js.map