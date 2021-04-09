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
/*
---------------

//  UNUSED

------------
*/
function singleValuePromise(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(val), 0);
    });
}
function arrayValuePromise(val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(val), 0);
    });
}
class FriendsFacade {
    constructor() {
        this.friends = [
            { id: "id1", firstName: "Peter", lastName: "Pan", email: "pp@b.dk", password: "secret" },
            { id: "id2", firstName: "Donald", lastName: "Duck", email: "dd@b.dk", password: "secret" },
        ];
    }
    addFriend(friend) {
        return __awaiter(this, void 0, void 0, function* () {
            this.friends.push(friend);
            return singleValuePromise(friend);
        });
    }
    updateFriend(friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            let friend;
            friend = this.friends.find(f => f.id === friendId) || null;
            return singleValuePromise(friend);
        });
    }
    deleteFriend(friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let friend;
            friend = this.friends.find(f => f.email === friendEmail) || null;
            return singleValuePromise(friend);
        });
    }
    getAllFriends() {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.friends;
            return arrayValuePromise(this.friends);
        });
    }
    getFriend(friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let friend;
            friend = this.friends.find(f => f.email === friendEmail) || null;
            return singleValuePromise(friend);
        });
    }
}
const facade = new FriendsFacade();
exports.default = facade;
//# sourceMappingURL=DummyDB-Facade.js.map