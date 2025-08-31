import { ragAnswer } from "@/lib/rag/rag";
import { NextRequest, NextResponse } from "next/server";
import { getRagChain } from "@/lib/rag/rag-chain";

export async function POST(req: NextRequest) {
	const { query } = await req.json();
	const ragChain = await getRagChain();
	const answer = await ragChain.invoke({ query });
	return NextResponse.json({
		answer,
	});
}
