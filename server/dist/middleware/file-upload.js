"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// console.log(__dirname)
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join("C:/Users/Jagdi/Desktop/harkirat/second-brain/server/src", "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const multerMilddlware = (0, multer_1.default)({
    storage: storage
});
exports.default = multerMilddlware;
