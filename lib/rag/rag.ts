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
      content: `User query: ${query}\n\nRetrieved courses:\n${context}\n\nReturn as JSON array: [{ "title": ..., "url": ..., "subject": ..., "reason": ... }]`,
    },
  ]);

  // Step 4: Parse JSON safely
  try {
    return JSON.parse(response.content as string);
  } catch {
    return docs.map((d) => ({
      title: d.metadata.title,
      url: d.metadata.url,
      subject: d.metadata.subject || "Unknown",
      reason: "Relevant to your query",
    }));
  }
}
