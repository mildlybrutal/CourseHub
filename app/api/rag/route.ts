import { NextRequest, NextResponse } from "next/server";
import { ragRecommendations } from "@/lib/rag/rag";

export async function POST(req: NextRequest) {
	const { query } = await req.json();
	const recommendations = await ragRecommendations(query);
	return NextResponse.json({ recommendations });
}
