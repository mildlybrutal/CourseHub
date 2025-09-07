import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface RouteContext {
	params: { id: string };
}

export async function GET(request: Request, { params }: RouteContext) {
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
