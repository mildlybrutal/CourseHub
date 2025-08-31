import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
	res: NextResponse,
	{ params }: { params: { id: string } }
) {
	const courseId = parseInt(params.id);

	try {
		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
			},
		});

		if (!course) {
			return NextResponse.json(
				{ message: "Course not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(course);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch course" },
			{ status: 500 }
		);
	}
}
