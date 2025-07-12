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
exports.RemoveUserFromGroupChat = exports.AddUserTOGroupChat = exports.RemoveGroupChat = exports.RenameGroupChat = exports.CreateFriendChat = exports.CreateGroupChat = exports.GetAllGroupChats = exports.GetAllChats = void 0;
const chat_1 = require("../db/chat");
const GetAllChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log(userId);
    if (userId) {
        try {
            const results = yield chat_1.one2oneChatModel.find({ members: userId }).populate("members");
            // console.log("results fetching chats: ", results);
            const dummy = [...results];
            let newArray = [];
            for (let i = 0; i < dummy.length; i++) {
                if (dummy[i].members[0]._id.toString() == userId) {
                    const newItem = {
                        _id: dummy[i]._id,
                        myId: userId,
                        friendId: dummy[i].members[1],
                        latestMessage: dummy[i].latestMessage
                    };
                    newArray.push(newItem);
                }
                else {
                    const newItem = {
                        _id: dummy[i]._id,
                        myId: userId,
                        friendId: dummy[i].members[0],
                        latestMessage: dummy[i].latestMessage
                    };
                    newArray.push(newItem);
                }
            }
            // console.log("new array", newArray)
            res.status(200).json({
                success: true,
                message: "All Chats are fetched Successfully",
                data: newArray
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId is not Provided"
        });
    }
});
exports.GetAllChats = GetAllChats;
const GetAllGroupChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (userId) {
        try {
            const results = yield chat_1.groupChatModel.find({ members: userId }).populate({ path: "members" }).populate({ path: "groupAdmin" });
            res.status(200).json({
                success: true,
                message: "All  Group Chats are fetched Successfully",
                data: results
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId is not Provided"
        });
    }
});
exports.GetAllGroupChats = GetAllGroupChats;
const CreateGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupAdminId } = req.params;
    const reqBody = req.body;
    if (groupAdminId) {
        reqBody.members.push(groupAdminId);
        if (reqBody.members.length < 2) {
            res.json({
                success: false,
                message: "Group have atleast two users"
            });
        }
        else {
            try {
                yield chat_1.groupChatModel.create({
                    groupAdmin: groupAdminId,
                    members: reqBody.members,
                    name: reqBody.name
                });
                res.status(200).json({
                    success: true,
                    message: "Group Chat created Successfully",
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: "Database Issue"
                });
            }
        }
    }
    else {
        res.json({
            success: false,
            message: "groupAdminId is not Provided"
        });
    }
});
exports.CreateGroupChat = CreateGroupChat;
const CreateFriendChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { friendId } = req.body;
    if (friendId) {
        try {
            const findChat = yield chat_1.one2oneChatModel.findOne({ "members": { $all: [userId, friendId] } }).populate("members");
            // console.log("findChat", findChat);
            if (findChat != null) {
                const dummy = [findChat];
                let newArray = [];
                for (let i = 0; i < dummy.length; i++) {
                    if (dummy[i].members[0]._id.toString() == userId) {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: userId,
                            friendId: dummy[i].members[1],
                            latestMessage: dummy[i].latestMessage
                        };
                        newArray.push(newItem);
                    }
                    else {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: userId,
                            friendId: dummy[i].members[0],
                            latestMessage: dummy[i].latestMessage
                        };
                        newArray.push(newItem);
                    }
                }
                // console.log("new array after changing" , newArray)
                res.json({
                    success: false,
                    message: "Already chat is Present",
                    data: newArray
                });
            }
            else {
                let getFromDb = yield chat_1.one2oneChatModel.create({
                    members: [userId, friendId]
                });
                const result = yield chat_1.one2oneChatModel.findById(getFromDb._id).populate("members");
                const dummy = [result];
                let newArray = [];
                for (let i = 0; i < dummy.length; i++) {
                    if (dummy[i].members[0].toString() == userId) {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: dummy[i].members[0]._id,
                            friendId: dummy[i].members[1],
                            latestMessage: dummy[i].latestMessage
                        };
                        newArray.push(newItem);
                    }
                    else {
                        const newItem = {
                            _id: dummy[i]._id,
                            myId: dummy[i].members[1]._id,
                            friendId: dummy[i].members[0],
                            latestMessage: dummy[i].latestMessage
                        };
                        newArray.push(newItem);
                    }
                }
                // console.log("result after creating", result)
                res.status(200).json({
                    success: true,
                    message: "friend Chat created Successfully",
                    data: newArray
                });
            }
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId and friend is not Provided"
        });
    }
});
exports.CreateFriendChat = CreateFriendChat;
const RenameGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { GroupId } = req.params;
    if (GroupId) {
        try {
            const results = yield chat_1.groupChatModel.findByIdAndUpdate(GroupId, {
                name: req.body.newName
            }, {
                new: true
            });
            res.status(200).json({
                success: true,
                message: "Group Chat renamed Successfully",
                data: results
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "GroupId is not Provided"
        });
    }
});
exports.RenameGroupChat = RenameGroupChat;
const RemoveGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, GroupId } = req.params;
    if (GroupId) {
        try {
            yield chat_1.groupChatModel.deleteOne({ GroupId });
            const results = yield chat_1.groupChatModel.find({ "members._id": userId });
            res.status(200).json({
                success: true,
                message: "Group Chat removed Successfully",
                data: results
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "GroupId is not Provided"
        });
    }
});
exports.RemoveGroupChat = RemoveGroupChat;
const AddUserTOGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, GroupId } = req.params;
    if (GroupId && userId) {
        try {
            const results = yield chat_1.groupChatModel.findByIdAndUpdate(GroupId, {
                $addToSet: {
                    members: userId
                }
            }, {
                new: true
            }).populate({ path: "members" }).populate({ path: "latestMessage" });
            ;
            res.status(200).json({
                success: true,
                message: "Group Chat removed Successfully",
                data: results
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "GroupId is not Provided"
        });
    }
});
exports.AddUserTOGroupChat = AddUserTOGroupChat;
const RemoveUserFromGroupChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, GroupId } = req.params;
    if (GroupId && userId) {
        try {
            const results = yield chat_1.groupChatModel.findByIdAndUpdate(GroupId, {
                $pull: {
                    members: userId
                }
            }, {
                new: true
            }).populate({ path: "members" }).populate({ path: "latestMessage" });
            ;
            res.status(200).json({
                success: true,
                message: "Group Chat removed Successfully",
                data: results
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: "Database Issue"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "GroupId is not Provided"
        });
    }
});
exports.RemoveUserFromGroupChat = RemoveUserFromGroupChat;
