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
const express_1 = require("express");
const router = express_1.Router();
const errors_1 = require("../errors/errors");
const friendFacade_1 = __importDefault(require("../facades/friendFacade"));
const debug = require("debug")("friend-routes");
let facade;
// Initialize facade using the database set on the application object
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!facade) {
        const db = req.app.get("db");
        debug("Database used: " + req.app.get("db-type"));
        facade = new friendFacade_1.default(db);
    }
    next();
}));
// This does NOT require authentication in order to let new users create themself
router.post('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let newFriend = req.body;
            //#####################################
            throw new Error("COMPLETE THIS METHOD");
            //#####################################
        }
        catch (err) {
            debug(err);
            if (err instanceof errors_1.ApiError) {
                next(err);
            }
            else {
                next(new errors_1.ApiError(err.message, 400));
            }
        }
    });
});
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield facade.getAllFriends();
    const friendsDTO = friends.map(friend => {
        const { firstName, lastName, email } = friend;
        return { firstName, lastName, email };
    });
    res.json(friendsDTO);
}));
router.put('/:email', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = null; //GET THE USERS EMAIL FROM SOMEWHERE (req.params OR req.credentials.userName)
            let newFriend = req.body;
            //#####################################
            throw new Error("COMPLETE THIS METHOD");
            //#####################################
        }
        catch (err) {
            debug(err);
            if (err instanceof errors_1.ApiError) {
                return next(err);
            }
            next(new errors_1.ApiError(err.message, 400));
        }
    });
});
router.get("/find-user/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userid;
    try {
        //#####################################
        throw new Error("COMPLETE THIS METHOD");
        //#####################################
    }
    catch (err) {
        debug(err);
        if (err instanceof errors_1.ApiError) {
            return next(err);
        }
        next(new errors_1.ApiError(err.message, 400));
    }
}));
exports.default = router;
//# sourceMappingURL=friendRoutes.js.map