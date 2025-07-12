"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../controllers/auth");
const AuthRouter = express_1.default.Router();
// type SignupProps = {
//     username : string,
//     password : string , 
//     email : string
// }
AuthRouter.post("/signup", auth_1.SignUp);
AuthRouter.post("/signin", auth_1.SignIn);
exports.default = AuthRouter;
