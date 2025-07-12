"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const linkSchema = new Schema({
    userId: { type: Schema.ObjectId, ref: "users", required: true },
    hashedLink: { type: String, required: true }
});
const linkModel = mongoose_1.default.model("links", linkSchema);
exports.default = linkModel;
