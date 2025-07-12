"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ollama_1 = require("@langchain/ollama");
const ollamaModel = new ollama_1.ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2:1b"
});
exports.default = ollamaModel;
