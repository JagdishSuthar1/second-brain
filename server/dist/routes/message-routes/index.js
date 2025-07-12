"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = require("../../controllers/message");
const MessageRouter = express_1.default.Router();
MessageRouter.post("/send/:userId", message_1.SendMessage);
MessageRouter.get("/get-all/:userId/:friendId", message_1.GetAllMessage);
MessageRouter.post("/send-group", message_1.SendGroupMessage);
MessageRouter.get("/get-all-group/:groupId", message_1.GetAllGroupMessage);
exports.default = MessageRouter;
