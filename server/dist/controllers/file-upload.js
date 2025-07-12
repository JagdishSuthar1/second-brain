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
exports.FileUploadToCloudinary = void 0;
const cloudinary_1 = require("../cloudinary");
const FileUploadToCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        console.log("file is missing");
        res.json({
            success: false,
            message: "File is missing"
        });
    }
    else {
        console.log("in the upload router");
        try {
            const data = yield (0, cloudinary_1.ImageAndVideoUploader)(req.file.path);
            res.json({
                success: true,
                message: "File upload Successfully",
                data: data
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Error in file uploading",
            });
        }
    }
});
exports.FileUploadToCloudinary = FileUploadToCloudinary;
