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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAndVideoUploader = ImageAndVideoUploader;
exports.DeleteVideoAndImage = DeleteVideoAndImage;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_NAME,
    api_key: config_1.CLOUDINARY_API,
    api_secret: config_1.CLOUDINARY_API_SECRET
});
function ImageAndVideoUploader(file_path) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in uploader");
        return new Promise(function (resolve, reject) {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                resource_type: "auto"
            }, function (err, result) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
            fs_1.default.createReadStream(file_path).on("error", (err) => {
                console.log("File stream creating is not done");
                reject(err);
            }).pipe(stream);
        });
    });
}
function DeleteVideoAndImage(public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield cloudinary_1.v2.uploader.destroy(public_id);
    });
}
