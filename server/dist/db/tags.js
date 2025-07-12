"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const tagSchema = new Schema({
    title: { type: String, required: true }
});
const tagsModel = mongoose_1.default.model("tags", tagSchema);
exports.default = tagsModel;
