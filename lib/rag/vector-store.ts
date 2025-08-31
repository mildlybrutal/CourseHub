import { PGVectorStore } from "@langchain/community/vectorstores/pgvector";
import { embeddings } from "./embeddings";
import {Pool} from "pg"

const connectionString = process.env.DATABASE_URL!

const pool = new Pool({
    connectionString
})

export async function getVectorStore(){
    return await PGVectorStore.initialize(embeddings,{
        pool,
        tableName:"course_vectors"
    })
}