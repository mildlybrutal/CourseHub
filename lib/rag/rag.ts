import { llm } from "./client";
import { getVectorStore } from "./vector-store";

export async function ragRecommendations(query: string) {
	// Step 1: Retrieve top-k relevant courses
	const vectorStore = await getVectorStore();
	const retriever = vectorStore.asRetriever(5);
	const docs = await retriever._getRelevantDocuments(query);

	// Step 2: Build context string
	const context = docs
		.map(
			(d) =>
				`Title: ${d.metadata.title}\nSubject: ${d.metadata.subject}\nUrl: ${d.metadata.url}\nDescription: ${d.pageContent}`
		)
		.join("\n\n");

	// Step 3: Ask LLM to format recommendations as JSON
	const response = await llm.invoke([
		{
			role: "system",
			content:
				"You are a course recommendation assistant. Only output valid JSON. Do not include any text outside JSON.",
		},
		{
			role: "user",
			content: `User query: ${query}\n\nRetrieved courses:\n${context}\n\nReturn as JSON array: [{ "title": ..., "url": ..., "subject": ..., "reason": "Why this course is a good match" }]`,
		},
	]);

	// Step 4: Parse JSON safely
	try {
		const rawContent = response.content as string;
		const jsonStart = rawContent.indexOf("[");
		const jsonEnd = rawContent.lastIndexOf("]");

		if (jsonStart !== -1 && jsonEnd !== -1) {
			const jsonString = rawContent.substring(jsonStart, jsonEnd + 1);
			return JSON.parse(jsonString);
		} else {
			// Fallback if no valid JSON structure is found
			return docs.map((d: any) => ({
				title: d.metadata.title,
				url: d.metadata.url,
				subject: d.metadata.subject || "Unknown",
				reason: "Relevant to your query",
			}));
		}
	} catch (err) {
		console.error("Failed to parse AI response:", err);
		// Fallback on parsing error
		return docs.map((d: any) => ({
			title: d.metadata.title,
			url: d.metadata.url,
			subject: d.metadata.subject || "Unknown",
			reason: "Relevant to your query",
		}));
	}
}
