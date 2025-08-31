import { llm } from "./client";
import { getRetriever } from "./retriever";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

export async function getRagChain() {
	const retriever = await getRetriever();
	const prompt = PromptTemplate.fromTemplate(`
        You are a course recommendation assistant.
        Given a user query and some retrieved courses, suggest the most relevant courses.

        Query: {query}
        Courses: {context}

        Answer in a clear, helpful way.
    `);

	return RunnableSequence.from([
		{
			context: async (input: { query: string }) => {
				const docs = await retriever._getRelevantDocuments(input.query);
				return docs
					.map((d) => `- ${d.metadata.title} (${d.metadata.url})`)
					.join("\n");
			},
			query: (input: { query: string }) => input.query,
		},
		prompt,
		llm,
	]);
}
