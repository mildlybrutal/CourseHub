import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";
import { getVectorStore } from "@/lib/rag/vector-store";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { embeddings } from "@/lib/rag/embeddings";

export async function POST() {
	try {
		const courses = await prisma.course.findMany({
			include:{
				tags:true
			}
		});
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
		const batchSize = 50;
		for (let i = 0; i < courses.length; i += batchSize) {
			const batch = courses.slice(i, i + batchSize);
			console.log(`Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(courses.length/batchSize)}`);

			// Create richer content for embedding
			const documents = batch.map((course) => {
				// Combine title, subject, and tags for better context
				const tags = course.tags.map(tag => tag.name).join(", ");
				const content = `${course.title}\nSubject: ${course.subject}\nTags: ${tags}`;
				
				return {
					pageContent: content,
					metadata: {
						id: course.id,
						title: course.title,
						subject: course.subject,
						url: course.url,
						tags: tags
					}
				};
			});

			try {
				await vectorStore.addDocuments(documents);
				console.log(` Processed ${documents.length} courses in this batch`);
			} catch (error) {
				console.error(` Error processing batch starting at index ${i}:`, error);
				
			}
		}

		return NextResponse.json({
			message: `✅ ${courses.length} courses embedded into pgvector`,
			total: courses.length
		});
	} catch (err:any) {
		console.error("Ingestion error:", err);
		return NextResponse.json(
			{ error: "Failed to ingest courses", details: err.message },
			{ status: 500 }
		);
	}
}
