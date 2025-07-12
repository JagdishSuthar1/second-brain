"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_1 = require("../../controllers/dashboard");
const ContentRouter = express_1.default.Router();
// type SignupProps = {
//     username : string,
//     password : string , 
//     email : string
// }
ContentRouter.get("/:userId", dashboard_1.UserContent);
ContentRouter.get("/single/:contentId", dashboard_1.GetContentById);
ContentRouter.get("/:userId/:type", dashboard_1.ContentType);
ContentRouter.post("/add-tag/:userId/", dashboard_1.AddTag);
ContentRouter.post("/add-content/:userId", dashboard_1.AddContent);
ContentRouter.delete("/delete-content/:userId/:contentId", dashboard_1.DeleteContent);
exports.default = ContentRouter;
