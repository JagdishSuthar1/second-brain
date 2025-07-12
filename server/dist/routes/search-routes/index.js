"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const search_1 = require("../../controllers/search");
const SearchRouter = express_1.default.Router();
SearchRouter.post("/top-suggestion", search_1.GetTop2Document);
SearchRouter.post("/ai-summarize", search_1.GetSummaryFromAi);
SearchRouter.post("/all-users", search_1.GetAllUsers);
exports.default = SearchRouter;
