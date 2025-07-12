"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../../controllers/chat");
const ChatRouter = express_1.default.Router();
ChatRouter.get("/my-chats/:userId", chat_1.GetAllChats);
ChatRouter.get("/my-group-chats/:userId", chat_1.GetAllGroupChats);
ChatRouter.post("/create-group-chat/:groupAdminId", chat_1.CreateGroupChat);
ChatRouter.post("/create-friend-chat/:userId", chat_1.CreateFriendChat);
ChatRouter.post("/remove-group-chat/:groupId", chat_1.RemoveGroupChat);
ChatRouter.put("/rename-group-chat/:groupId", chat_1.RenameGroupChat);
ChatRouter.post("/add-user/:userId/:groupId", chat_1.AddUserTOGroupChat);
ChatRouter.delete("/remove-user/:userId/:groupId", chat_1.RemoveUserFromGroupChat);
exports.default = ChatRouter;
