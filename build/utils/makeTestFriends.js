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
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.join(__dirname, "..", "..", '.env') });
const dbConnector_1 = require("../config/dbConnector");
const debug = require("debug")("setup-friend-testdata");
const bcryptjs_1 = require("bcryptjs");
function tester() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbConnector_1.DbConnector.connect();
        const db = client.db(process.env.DB_NAME);
        const friendsCollection = db.collection("friends");
        const hashedPW = yield bcryptjs_1.hash("secret", 8);
        friendsCollection.createIndex({ email: 1 }, { unique: true });
        yield friendsCollection.deleteMany({});
        const status = yield friendsCollection.insertMany([
            { firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: hashedPW, role: "user" },
            { firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: hashedPW, role: "user" },
            { firstName: "Peter", lastName: "Admin", email: "peter@admin.dk", password: hashedPW, role: "admin" },
        ]);
        debug(`Inserted ${status.insertedCount} test users`);
        debug(`##################################################`);
        debug(`NEVER, EVER EVER run this on a production database`);
        debug(`##################################################`);
        dbConnector_1.DbConnector.close();
    });
}
tester();
//# sourceMappingURL=makeTestFriends.js.map