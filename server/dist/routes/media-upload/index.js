"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_upload_1 = require("../../controllers/file-upload");
const file_upload_2 = __importDefault(require("../../middleware/file-upload"));
const FileUploadRouter = express_1.default.Router();
FileUploadRouter.post("/upload", file_upload_2.default.single("file"), file_upload_1.FileUploadToCloudinary);
exports.default = FileUploadRouter;
