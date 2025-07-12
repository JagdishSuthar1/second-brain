import axios from "axios";


async function createEmbeddings(text:string) {
    const response = await axios.post("http://localhost:11434/api/embeddings" , {
        model : "nomic-embed-text:v1.5",
        prompt : text
    })


    return response.data.embedding
}


export default createEmbeddings;