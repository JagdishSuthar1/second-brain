import { ChatOllama } from "@langchain/ollama";

const ollamaModel = new ChatOllama({
    baseUrl: "http://localhost:11434",
    model: "llama3.2:1b"
});


export default ollamaModel