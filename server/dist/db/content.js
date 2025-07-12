"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const contentSchema = new Schema({
    link: { type: String },
    type: { type: String, enum: ["video", "image", "document", "tweet", "link", "tag"], required: true },
    title: { type: String, required: true },
    data: { type: String },
    allTags: [{ type: Schema.ObjectId, ref: "tags" }],
    video_image_url: { type: String },
    public_id: { type: String },
    userId: { type: Schema.ObjectId, ref: "users" },
    created: { type: Date },
    embedding: [{ type: Number }]
});
const contentModel = mongoose_1.default.model("content", contentSchema);
exports.default = contentModel;
