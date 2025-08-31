import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { getVectorStore } from "@/lib/rag/vector-store";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { embeddings } from "@/lib/rag/embeddings";

export async function POST() {
	try {
		const courses = await prisma.course.findMany();
		if (!courses.length) {
			return NextResponse.json(
				{ message: "No courses found" },
				{ status: 404 }
			);
		}

		const vectorStore = await getVectorStore();

		const splitter = new RecursiveCharacterTextSplitter({
			chunkSize: 1000,
			chunkOverlap: 200,
		});
		const batchSize = 200;
		for (let i = 0; i < courses.length; i += batchSize) {
			const batch = courses.slice(i, i + batchSize);

			const texts = batch.map((c) => c.title);
			const metadatas = batch.map((c) => ({
				id: c.id,
				title: c.title,
				url: c.url,
			}));

			await vectorStore.addDocuments(
				texts.map((t, i) => ({
					pageContent: t,
					metadata: metadatas[i],
				}))
			);
		}
		return NextResponse.json({
			message: "✅ Courses embedded into pgvector",
		});
	} catch (err) {
		console.error("Ingestion error:", err);
		return NextResponse.json(
			{ error: "Failed to ingest courses" },
			{ status: 500 }
		);
	}
}
