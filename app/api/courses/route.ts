import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const page = parseInt(searchParams.get("page") || "1");
	const limit = parseInt(searchParams.get("limit") || "20");
	 const subject = searchParams.get("subject");

	const skip = (page - 1) * limit;

	try {

		const where = subject ? {subject} :{}

		const courses = await prisma.course.findMany({
			where,
			orderBy: {
				id: "asc",
			},
			skip,
			take: limit,
		});

		const totalCourses = await prisma.course.count({where});

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
		return NextResponse.json(
			{
				message: "Failed to fetch courses",
			},
			{
				status: 500,
			}
		);
	}
}
