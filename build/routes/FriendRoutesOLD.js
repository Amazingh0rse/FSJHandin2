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
const DummyDB_Facade_1 = __importDefault(require("../facades/DummyDB-Facade"));
//Basic-auth
const basic_auth_1 = __importDefault(require("../middleware/basic-auth"));
router.use(basic_auth_1.default);
const Joi = require('joi');
router.use(express_1.default.json());
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield DummyDB_Facade_1.default.getAllFriends();
    const friendsDTO = friends.map(friend => {
        const { firstName, lastName, email } = friend;
        return { firstName, lastName, email };
    });
    res.json(friendsDTO);
}));
router.get("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friend = yield DummyDB_Facade_1.default.getFriend(req.params.email);
    if (!friend)
        return res.status(404).send('The friend with the given EMAIL was not found');
    res.json(friend);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield DummyDB_Facade_1.default.getAllFriends();
    const { error } = validateFriend(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const friend = {
        id: "id" + (friends.length + 1),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const f = yield DummyDB_Facade_1.default.addFriend(friend);
    res.json(f);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friend = yield DummyDB_Facade_1.default.updateFriend(req.params.id);
    if (!friend)
        return res.status(404).send('The friend with the given ID was not found');
    const { error } = validateFriend(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    friend.firstName = req.body.firstName;
    friend.lastName = req.body.lastName;
    friend.email = req.body.email;
    friend.password = req.body.password;
    res.send(friend);
}));
router.delete("/:email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friends = yield DummyDB_Facade_1.default.getAllFriends();
    const friend = yield DummyDB_Facade_1.default.deleteFriend(req.params.email);
    if (!friend)
        return res.status(404).send('The friend with the given EMAIL was not found');
    const index = friends.indexOf(friend);
    friends.splice(index, 1);
    res.json(friend);
}));
// For validating POST and PUT
function validateFriend(friend) {
    const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(friend, schema);
}
router.get("/findby-username/:userid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userid;
    try {
        const friend = yield DummyDB_Facade_1.default.getFriend(userId);
        if (friend == null) {
            throw new Error("user not found");
        }
        const { firstName, lastName, email } = friend;
        const friendDTO = { firstName, lastName, email };
        res.json(friendDTO);
    }
    catch (err) {
        next(err);
    }
}));
router.get("/me", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.credentials.userName;
    try {
        const friend = yield DummyDB_Facade_1.default.getFriend(userId);
        if (friend == null) {
            throw new Error("user not found");
        }
        const { firstName, lastName, email } = friend;
        const friendDTO = { firstName, lastName, email };
        res.json(friendDTO);
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=FriendRoutesOLD.js.map