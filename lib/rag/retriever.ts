import { getVectorStore } from "./vector-store";

export async function getRetriever() {
	const vectorStore = await getVectorStore();

	return vectorStore.asRetriever({
		k: 5,
	});
}
