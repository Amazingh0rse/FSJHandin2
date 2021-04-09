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
const basic_auth_1 = __importDefault(require("basic-auth"));
const friendFacade_1 = __importDefault(require("../facades/friendFacade"));
let facade;
const authMiddleware = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!facade) {
            facade = new friendFacade_1.default(req.app.get("db")); //Observe how you have access to the global app-object via the request object
        }
        var credentials = basic_auth_1.default(req);
        if (credentials && (yield check(credentials.name, credentials.pass, req))) {
            next();
        }
        else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="example"');
            res.end('Access denied');
        }
    });
};
function check(userName, pass, req) {
    return __awaiter(this, void 0, void 0, function* () {
        //if (user && compare(pass, user.password)) {
        const verifiedUser = yield facade.getVerifiedUser(userName, pass);
        if (verifiedUser) {
            req.credentials = { userName: verifiedUser.email, role: verifiedUser.role };
            //req.credentials = {userName:user.email,role:"user"}  
            return true;
        }
        return false;
    });
}
exports.default = authMiddleware;
//# sourceMappingURL=basic-auth.js.map