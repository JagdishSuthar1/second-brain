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
exports.SignIn = exports.SignUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../db/user"));
const auth_types_1 = require("../types/auth.types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const SignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signupData = req.body;
    if (signupData) {
        const parsedSignupData = auth_types_1.signupSchema.safeParse(signupData);
        if (parsedSignupData.success == true) {
            const hashedPassword = yield bcryptjs_1.default.hash(parsedSignupData.data.password, 3);
            try {
                yield user_1.default.create({
                    username: parsedSignupData.data.username,
                    password: hashedPassword,
                    email: parsedSignupData.data.email
                });
                res.status(200).json({
                    success: true,
                    message: "Sign up Successfully"
                });
            }
            catch (err) {
                console.log(err);
                res.status(404).json({
                    success: false,
                    message: "Database Error"
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: "Data format Error"
            });
        }
    }
    else {
        res.status(404).json({
            success: false,
            message: "Data format error"
        });
    }
});
exports.SignUp = SignUp;
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const signInData = req.body;
    if (signInData) {
        const parsedSignInData = auth_types_1.signInSchema.safeParse(signInData);
        if (parsedSignInData.success == true) {
            try {
                const user = yield user_1.default.findOne({ email: parsedSignInData.data.email });
                if (user) {
                    const checkPassword = yield bcryptjs_1.default.compare(parsedSignInData.data.password, user.password);
                    if (checkPassword == true) {
                        const token = jsonwebtoken_1.default.sign({
                            id: user._id,
                            password: user.password,
                            email: user.email
                        }, config_1.JWT_SECRET);
                        res.status(200).json({
                            success: true,
                            message: "SignIn Successfully",
                            data: {
                                userId: user._id,
                                token: token
                            }
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: "Unauthorised Access"
                        });
                    }
                }
                else {
                    res.json({
                        success: false,
                        message: "SignUp first"
                    });
                }
            }
            catch (err) {
                console.log(err);
                res.status(404).json({
                    success: false,
                    message: "Database Error"
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                message: "Data format Error",
                data: parsedSignInData.error.format
            });
        }
    }
    else {
        res.status(404).json({
            success: false,
            message: "Fill the data correctly"
        });
    }
});
exports.SignIn = SignIn;
