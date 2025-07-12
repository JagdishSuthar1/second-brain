"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const groupSchema = new Schema({
    groupId: { type: Schema.ObjectId, ref: "groupChats" },
    userId: { type: Schema.ObjectId, ref: "users" },
    message: { type: String, required: true }
}, {
    timestamps: true
});
const groupMessageModel = mongoose_1.default.model("groupMessages", groupSchema);
exports.default = groupMessageModel;
