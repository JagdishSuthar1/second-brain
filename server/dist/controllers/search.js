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
exports.GetAllUsers = exports.GetSummaryFromAi = exports.GetTop2Document = void 0;
const embeddings_1 = __importDefault(require("../ollamaModel/embeddings"));
const content_1 = __importDefault(require("../db/content"));
const prompts_1 = require("@langchain/core/prompts");
const zod_1 = __importDefault(require("zod"));
const index_1 = __importDefault(require("../ollamaModel/index"));
const output_parsers_1 = require("langchain/output_parsers");
const document_1 = require("langchain/document");
const combine_documents_1 = require("langchain/chains/combine_documents");
const user_1 = __importDefault(require("../db/user"));
const GetTop2Document = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (text != null) {
        console.log(text);
        try {
            const searchEmbedding = yield (0, embeddings_1.default)(text);
            // here i am calling to mongodb with this embeddings;
            const results = yield content_1.default.collection.aggregate([
                {
                    $vectorSearch: {
                        index: "embedForContent",
                        queryVector: searchEmbedding,
                        path: 'embedding',
                        numCandidates: 5,
                        limit: 2
                    }
                },
                {
                    $project: {
                        link: 1,
                        type: 1,
                        title: 1,
                        data: 1,
                        allTags: 1,
                        userId: 1,
                        created: 1,
                    }
                }
            ]).toArray();
            console.log(results);
            res.status(200).json({
                success: true,
                message: "Suggestion fetched Successfully",
                data: results
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Embeddings not created"
            });
        }
    }
});
exports.GetTop2Document = GetTop2Document;
const GetSummaryFromAi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reqQuery, documents } = req.body;
    console.log(req.body);
    // if (reqQuery && documents) {
    try {
        const docs = [];
        for (let i = 0; i < documents.length; i++) {
            const newdoc = new document_1.Document({
                pageContent: documents[i].data,
            });
            docs.push(newdoc);
        }
        console.log(docs);
        const zodSchema = zod_1.default.object({
            title: zod_1.default.string().describe("Title"),
            detailInformation: zod_1.default.string().describe("detail information about the query"),
            keyPoints: zod_1.default.array(zod_1.default.string()).describe("Array of 20 key points"),
        });
        // const prompt = ChatPromptTemplate.fromTemplate("Generate the contents for the query : {query} with the given context : {context} in the following json schema : {instructions}");
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ["system",
                `You are a JSON-only generator. Your task is to return a JSON object that strictly matches the following structure:


  "title": string,                  // A short title summarizing the content
  "detailInformation": string,     // Generate A detailed explanation related to the input with the context and your knowledge
  "keyPoints": string[20]          // Exactly 20 key points as an array of strings


RULES:
- Output ONLY a valid JSON object.
- Do NOT include explanations, comments, markdown, or code blocks.
- Do NOT return anything other than the JSON object.
`],
            ["user", "Input: {query}\nContext: {context}\n\nRespond with the JSON:"]
        ]);
        const chain = yield (0, combine_documents_1.createStuffDocumentsChain)({
            llm: index_1.default,
            prompt: prompt
        });
        const outPutParser = output_parsers_1.StructuredOutputParser.fromZodSchema(zodSchema);
        const outputChain = chain.pipe(outPutParser);
        const response = yield outputChain.invoke({
            query: reqQuery,
            context: docs
        });
        // console.log(response);
        res.status(200).json({
            success: true,
            message: "Ai Response fetched Successfully",
            data: response
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Ai is not working",
        });
    }
    // }
    // else {
    //     res.status(400).json({
    //         success: false,
    //         message: "Query and Documents are not given",
    //     })
    // }
});
exports.GetSummaryFromAi = GetSummaryFromAi;
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    if (query != null) {
        console.log(query);
        try {
            const regex = new RegExp(query, "i");
            const results = yield user_1.default.find({ username: regex });
            console.log(results);
            res.status(200).json({
                success: true,
                message: "Users fetched Successfully",
                data: [...results]
            });
        }
        catch (err) {
            console.log(err);
            res.json({
                success: false,
                message: "Embeddings not created"
            });
        }
    }
    else {
        res.json({
            success: false,
            message: "Query if not defined"
        });
    }
});
exports.GetAllUsers = GetAllUsers;
