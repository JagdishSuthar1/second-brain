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
exports.GetContentById = exports.DeleteContent = exports.AddContent = exports.AddTag = exports.ContentType = exports.UserContent = void 0;
const content_1 = __importDefault(require("../db/content"));
const tags_1 = __importDefault(require("../db/tags"));
const embeddings_1 = __importDefault(require("../ollamaModel/embeddings"));
const UserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    console.log(userId);
    if (userId != undefined) {
        try {
            const content = yield content_1.default.find({ userId });
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
exports.UserContent = UserContent;
const ContentType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, type } = req.params;
    if (userId) {
        try {
            const content = yield content_1.default.find({ userId, type }).populate("allTags");
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
exports.ContentType = ContentType;
// type TagType
const AddTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tagBody = req.body;
    const { userId } = req.params;
    if (userId) {
        try {
            const tagInDb = yield tags_1.default.create({ title: tagBody.title });
            res.status(200).json({
                success: true,
                message: "Tag Added Successfully",
                data: tagInDb
            });
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
exports.AddTag = AddTag;
const AddContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentBody = req.body;
    const { userId } = req.params;
    if (userId != null && contentBody != null) {
        try {
            console.log("In the add content ", contentBody);
            const stringForEmbedd = `link : ${contentBody.link} , type : ${contentBody.type} , title : ${contentBody.title} , data : ${contentBody.data}`;
            const embeddingFromOllama = yield (0, embeddings_1.default)(stringForEmbedd);
            yield content_1.default.create({
                link: contentBody.link,
                type: contentBody.type,
                title: contentBody.title,
                data: contentBody.data,
                allTags: contentBody.allTags,
                userId: userId,
                video_image_url: contentBody.video_image_url,
                public_id: contentBody.public_id,
                created: new Date().getDate(),
                embedding: embeddingFromOllama
            });
            res.status(200).json({
                success: true,
                message: "Content and Embedding Added Successfully",
            });
            // else {
            //     res.status(400).json({
            //         success: false,
            //         message: "Embedding Not Successfully",
            //     })
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
            message: "UserId and ContentBody is Not correct"
        });
    }
});
exports.AddContent = AddContent;
const DeleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, contentId } = req.params;
    if (userId) {
        try {
            yield content_1.default.findByIdAndDelete(contentId);
            const content = yield content_1.default.find({ userId });
            if (content) {
                res.status(200).json({
                    success: true,
                    message: "Content deleted Successfully",
                    data: content
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "No data found",
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
exports.DeleteContent = DeleteContent;
const GetContentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    if (contentId != undefined) {
        try {
            console.log(contentId);
            const content = yield content_1.default.findById(contentId);
            console.log(content);
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
            message: "ContentId is Not correct"
        });
    }
});
exports.GetContentById = GetContentById;
