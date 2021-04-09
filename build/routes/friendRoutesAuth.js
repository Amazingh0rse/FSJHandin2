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
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const router = express_2.Router();
const errors_1 = require("../errors/errors");
const friendFacade_1 = __importDefault(require("../facades/friendFacade"));
const debug = require("debug")("friend-routes");
let facade;
router.use(express_1.default.json());
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
            const status = yield facade.addFriend(newFriend);
            res.json({ status });
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
// ALL ENDPOINTS BELOW REQUIRES AUTHENTICATION
const basic_auth_1 = __importDefault(require("../middleware/basic-auth"));
const USE_AUTHENTICATION = !process.env["SKIP_AUTHENTICATION"];
if (USE_AUTHENTICATION) {
    router.use(basic_auth_1.default);
}
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield facade.getAllFriends();
    const friendsDTO = friends.map(friend => {
        const { firstName, lastName, email } = friend;
        return { firstName, lastName, email };
    });
    res.json(friendsDTO);
}));
/**
 * authenticated users can edit himself
 */
router.get("/me", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!USE_AUTHENTICATION) {
            throw new errors_1.ApiError("This endpoint requires authentication", 500);
        }
        const emailId = req.credentials.userName; //GET THE USERS EMAIL FROM SOMEWHERE (req.params OR req.credentials.userName)
        const friend = yield facade.getFriend(emailId);
        const { firstName, lastName, email, role, password } = friend;
        const friendDTO = { firstName, lastName, email, role, password };
        res.json(friendDTO);
    }
    catch (err) {
        next(err);
    }
}));
router.put('/editme', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!USE_AUTHENTICATION) {
                throw new errors_1.ApiError("This endpoint requires authentication", 500);
            }
            const email = req.credentials.userName;
            let newFriend = req.body;
            const friend = yield facade.editMe(email, newFriend);
            res.json(friend);
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
//These endpoint requires admin rights
//An admin user can fetch everyone
router.get("/find-user/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (USE_AUTHENTICATION && !req.credentials.role && req.credentials.role !== "admin") {
            throw new errors_1.ApiError("Not Authorized", 401);
        }
        const userId = req.params.email;
        const friend = yield facade.getFriend(userId);
        if (friend == null) {
            throw new errors_1.ApiError("user not found", 404);
        }
        const { firstName, lastName, email, role } = friend;
        const friendDTO = { firstName, lastName, email };
        res.json(friendDTO);
    }
    catch (err) {
        next(err);
    }
}));
//An admin user can edit everyone
router.put('/:email', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (USE_AUTHENTICATION && !req.credentials.role && req.credentials.role !== "admin") {
                throw new errors_1.ApiError("Not Authorized", 401);
            }
            const email = req.params.email; //GET THE USERS EMAIL FROM SOMEWHERE (req.params OR req.credentials.userName)
            const f = yield facade.getFriend(email);
            if (f == null) {
                throw new errors_1.ApiError("user not found", 404);
            }
            const newFriend = req.body;
            let friend = yield facade.editFriend(email, newFriend);
            res.json(friend);
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
router.delete('/:email', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (USE_AUTHENTICATION && !req.credentials.role && req.credentials.role !== "admin") {
                throw new errors_1.ApiError("Not Authorized", 401);
            }
            const userId = req.params.email;
            const friend = yield facade.deleteFriend(userId);
            if (friend == false) {
                throw new errors_1.ApiError("user not found", 404);
            }
            res.json("User deleted");
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
exports.default = router;
//# sourceMappingURL=friendRoutesAuth.js.map