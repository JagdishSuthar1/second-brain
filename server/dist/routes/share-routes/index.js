"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const share_1 = require("../../controllers/share");
const ShareBrainRouter = express_1.default.Router();
ShareBrainRouter.get("/:id", share_1.SharedContent);
ShareBrainRouter.get("/:id/:type", share_1.ShareContentType);
exports.default = ShareBrainRouter;
