import { llm } from "./client";
import { getRetriever } from "./retriever";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

export async function getRagChain() {
	const retriever = await getRetriever();

	const prompt = PromptTemplate.fromTemplate(`
You are a course recommendation assistant.
The user asks: {query}

Here are the retrieved courses:
{context}

Return the output strictly as a JSON array of objects with this shape:
[
  {
    "title": "Course title",
    "url": "Course url",
    "subject": "Subject/category",
    "reason": "Why this course is a good match"
  }
]

Do not include any extra text outside the JSON.
  `);

	return RunnableSequence.from([
		{
			context: async (input: { query: string }) => {
				const docs = await retriever.getRelevantDocuments(input.query);
				return docs
					.map(
						(d) =>
							`- Title: ${d.metadata.title}\n  Subject: ${d.metadata.subject}\n  Url: ${d.metadata.url}\n  Description: ${d.pageContent}`
					)
					.join("\n\n");
			},
			query: (input: { query: string }) => input.query,
		},
		prompt,
		llm,
		{
			output: async (raw: any) => {
				try {
					return JSON.parse(raw);
				} catch {
					return [
						{
							title: "Parsing error",
							url: "",
							subject: "",
							reason: raw,
						},
					];
				}
			},
		},
	]);
}
