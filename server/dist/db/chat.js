"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.one2oneChatModel = exports.groupChatModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const groupChatSchema = new Schema({
    groupAdmin: { type: Schema.ObjectId, required: true, ref: "users" },
    members: [{ type: Schema.ObjectId, ref: "users" }],
    name: { type: String, required: true },
    latestMessage: { type: String, ref: "message" }
}, {
    timestamps: true
});
const groupChatModel = mongoose_1.default.model("groupChats", groupChatSchema);
exports.groupChatModel = groupChatModel;
const one2oneChatSchema = new Schema({
    members: [{ type: Schema.ObjectId, ref: "users" }],
    latestMessage: { type: String, ref: "message" }
}, {
    timestamps: true
});
const one2oneChatModel = mongoose_1.default.model("one2oneChats", one2oneChatSchema);
exports.one2oneChatModel = one2oneChatModel;
