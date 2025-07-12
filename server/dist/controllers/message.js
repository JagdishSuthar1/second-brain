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
exports.GetAllGroupMessage = exports.SendGroupMessage = exports.GetAllMessage = exports.SendMessage = void 0;
const message_1 = __importDefault(require("../db/message"));
const groupMessages_1 = __importDefault(require("../db/groupMessages"));
const SendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { friendId, message } = req.body;
    if (userId && friendId) {
        try {
            // console.log("type of : ", typeof message)
            const getFromDb = yield message_1.default.create({
                members: [userId, friendId],
                message: message
            });
            const results = yield message_1.default.findById(getFromDb._id).populate("members");
            //  const dummy = [results!];
            if (results) {
                let newArray = {};
                if (results.members[0].toString() == userId) {
                    newArray = {
                        _id: results._id,
                        myId: userId,
                        message: results.message,
                        friendId: results.members[1],
                    };
                }
                else {
                    newArray = {
                        _id: results._id,
                        myId: userId,
                        message: results.message,
                        friendId: results.members[0]
                    };
                }
                res.json({
                    success: true,
                    message: "Message Add Successfully",
                    data: newArray
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Message Not Added",
                });
            }
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId RecieverId and Message are not provided"
        });
    }
});
exports.SendMessage = SendMessage;
const GetAllMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.params;
    // console.log("message router")
    if (userId && friendId) {
        // console.log("user : ", userId  + " and friendId ", friendId )
        try {
            const results = yield message_1.default.find({ "members": { $all: [userId, friendId] } }).populate("members");
            // console.log("results from message : ", results)
            if (results.length >= 0) {
                const dummy = results;
                let newArray = [];
                for (let i = 0; i < dummy.length; i++) {
                    if (dummy[i].members[0]._id.toString() == userId) {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: userId,
                            message: dummy[i].message,
                            friendId: dummy[i].members[0]
                        };
                        newArray.push(newItem);
                    }
                    else {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: friendId,
                            message: dummy[i].message,
                            friendId: dummy[i].members[0]
                        };
                        newArray.push(newItem);
                    }
                    // console.log("new array of messages", newArray)
                }
                res.json({
                    success: true,
                    message: "Messages Fetch Successfully",
                    data: newArray
                });
            }
            else {
                res.json({
                    success: false,
                    message: "No Messages in the Database",
                });
            }
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId & FriendId are not provided"
        });
    }
});
exports.GetAllMessage = GetAllMessage;
const SendGroupMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId, userId, message } = req.body;
    if (groupId && userId && message) {
        try {
            // console.log("In send Group Message ");
            const getFromDb = yield groupMessages_1.default.create({
                groupId: groupId,
                userId: userId,
                message: message
            });
            const result = yield groupMessages_1.default.findById(getFromDb._id).populate("userId");
            res.json({
                success: true,
                message: "Group Message Add Successfully",
                data: result
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId RecieverId and Message are not provided"
        });
    }
});
exports.SendGroupMessage = SendGroupMessage;
const GetAllGroupMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupId } = req.params;
    if (groupId) {
        try {
            // console.log("In send Group Message ");
            const results = yield groupMessages_1.default.find({
                groupId: groupId
            }).populate("userId").sort({ createdAt: 1 });
            res.json({
                success: true,
                message: "Group Messages fetch Successfully",
                data: results
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "GroupId are not provided"
        });
    }
});
exports.GetAllGroupMessage = GetAllGroupMessage;
