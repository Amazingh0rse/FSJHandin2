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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../errors/errors");
const joi_1 = __importDefault(require("joi"));
const BCRYPT_ROUNDS = 10;
const USER_INPUT_SCHEMA = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(40).required(),
    lastName: joi_1.default.string().min(2).max(50).required(),
    password: joi_1.default.string().min(4).max(30).required(),
    email: joi_1.default.string().email().required()
});
class FriendsFacade {
    constructor(db) {
        this.db = db;
        this.friendCollection = db.collection("friends");
    }
    /**
     *
     * @param friend
     * @throws ApiError if validation fails
     */
    addFriend(friend) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = USER_INPUT_SCHEMA.validate(friend);
            if (status.error) {
                throw new errors_1.ApiError(status.error.message, 400);
            }
            const hashedpw = yield bcryptjs_1.default.hash(friend.password, BCRYPT_ROUNDS);
            const f = Object.assign(Object.assign({}, friend), { password: hashedpw });
            yield this.friendCollection.insertOne({
                firstName: f.firstName,
                lastName: f.lastName,
                email: f.email,
                password: f.password,
                role: "user"
            });
            return this.friendCollection.findOne({ email: f.email });
        });
    }
    /**
     * TODO
     * @param email
     * @param friend
     * @throws ApiError if validation fails or friend was not found
     */
    editFriend(email, friend) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = USER_INPUT_SCHEMA.validate(friend);
            if (status.error) {
                throw new errors_1.ApiError(status.error.message, 400);
            }
            const hashedpw = yield bcryptjs_1.default.hash(friend.password, BCRYPT_ROUNDS);
            const f = Object.assign(Object.assign({}, friend), { password: hashedpw });
            yield this.friendCollection.updateOne({ email: email }, {
                $set: {
                    firstName: f.firstName,
                    lastName: f.lastName,
                    email: f.email,
                    password: f.password,
                    role: "user"
                },
                $currentDate: { lastModified: true }
            });
            return this.friendCollection.findOne({ email: f.email });
        });
    }
    /**
     * TODO
     * @param email
     * @param friend
     * @throws ApiError if validation fails or friend was not found
     */
    editMe(email, friend) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = USER_INPUT_SCHEMA.validate(friend);
            if (status.error) {
                throw new errors_1.ApiError(status.error.message, 400);
            }
            const hashedpw = yield bcryptjs_1.default.hash(friend.password, BCRYPT_ROUNDS);
            const f = Object.assign(Object.assign({}, friend), { password: hashedpw });
            yield this.friendCollection.updateOne({ email: email }, {
                $set: {
                    firstName: f.firstName,
                    lastName: f.lastName,
                    password: f.password,
                },
                $currentDate: { lastModified: true }
            });
            return this.friendCollection.findOne({ email: f.email });
        });
    }
    /**
     *
     * @param friendEmail
     * @returns true if deleted otherwise false
     */
    deleteFriend(friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const friend = yield this.friendCollection.findOne({ email: friendEmail });
            if (!friend)
                return false;
            yield this.friendCollection.deleteOne(friend);
            return true;
        });
    }
    getAllFriends() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.friendCollection.find({}).toArray();
            return users;
        });
    }
    /**
     *
     * @param friendEmail
     * @returns
     * @throws ApiError if not found
     */
    getFriend(friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const friend = yield this.friendCollection.findOne({ email: friendEmail });
            return friend;
        });
    }
    /**
     * Use this method for authentication
     * @param friendEmail
     * @param password
     * @returns the user if he could be authenticated, otherwise null
     */
    getVerifiedUser(friendEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const friend = yield this.friendCollection.findOne({ email: friendEmail });
            if (friend && bcryptjs_1.default.compare(password, friend.password)) {
                return friend;
            }
            return Promise.resolve(null);
        });
    }
}
exports.default = FriendsFacade;
//# sourceMappingURL=friendFacade.js.map