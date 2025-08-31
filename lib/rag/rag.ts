import { llm } from "./client";
import { getVectorStore } from "./vector-store";

export async function retrieveCourses(query: string) {
	const vectorStore = await getVectorStore();
	const retriever = vectorStore.asRetriever(5);
	const docs = await retriever._getRelevantDocuments(query);

	return docs.map((doc) => ({
		title: doc.metadata?.title,
		url: doc.metadata?.url,
		score: doc.metadata.score,
	}));
}

export async function ragAnswer(query: string) {
	const vectorStore = await getVectorStore();
	const retriever = vectorStore.asRetriever(5);

	const docs = await retriever._getRelevantDocuments(query);
	const context = docs.map((d) => d.pageContent).join("\n");

	const response = await llm.invoke([
		{
			role: "system",
			content: "You are a helpful tutor recommending courses.",
		},
		{ role: "user", content: `Question: ${query}\n\nCourses:\n${context}` },
	]);

	return response.content;
}
