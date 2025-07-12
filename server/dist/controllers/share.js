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
exports.ShareContentType = exports.SharedContent = void 0;
const content_1 = __importDefault(require("../db/content"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const secretKey = "Jagdish-Suthar";
const SharedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id) {
        try {
            const safeId = decodeURIComponent(id);
            const byteId = crypto_js_1.default.AES.decrypt(safeId, secretKey);
            const originalId = byteId.toString(crypto_js_1.default.enc.Utf8);
            console.log(originalId);
            const results = yield content_1.default.find({ userId: originalId });
            if (results) {
                res.json({
                    success: true,
                    message: "Brain Information Fetched Successfully",
                    data: results
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Brain Information Not Found"
                });
            }
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Database Issue",
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "UserId is not Defind"
        });
    }
});
exports.SharedContent = SharedContent;
const ShareContentType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, type } = req.params;
    const safeId = decodeURIComponent(id);
    const byteId = crypto_js_1.default.AES.decrypt(safeId, secretKey);
    const originalId = byteId.toString(crypto_js_1.default.enc.Utf8);
    if (originalId) {
        try {
            const content = yield content_1.default.find({ userId: originalId, type }).populate("allTags");
            // console.log(content);
            if (content) {
                res.status(200).json({
                    success: true,
                    message: "Data fetched Successfully",
                    data: content
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Data Not Found",
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                message: "Database Issue",
            });
        }
    }
    else {
        res.status(400).json({
            success: false,
            message: "UserId is Not correct"
        });
    }
});
exports.ShareContentType = ShareContentType;
