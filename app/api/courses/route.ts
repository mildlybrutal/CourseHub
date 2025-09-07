import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma-client";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "20");
	const subject = searchParams.get("subject");

	const skip = (page - 1) * limit;

	try {
		const where = subject ? { subject } : {};

		const courses = await prisma.course.findMany({
			where,
			orderBy: {
				id: "asc",
			},
			skip,
			take: limit,
		});

		const totalCourses = await prisma.course.count({ where });

		return NextResponse.json({
			data: courses,
			pagination: {
				total: totalCourses,
				page,
				limit,
				totalPages: Math.ceil(totalCourses / limit),
			},
		});
	} catch (error) {
		console.error("Database error:", error);
		return NextResponse.json(
			{
				message: "Failed to fetch courses",
				error: process.env.NODE_ENV === "development" ? error : undefined,
			},
			{
				status: 500,
			}
		);
	}
}