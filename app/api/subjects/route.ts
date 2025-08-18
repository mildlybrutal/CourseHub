import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const subjects = await prisma.course.findMany({
			select: {
				subject: true,
			},
			distinct: ["subject"],
			orderBy: {
				subject: "asc",
			},
		});

		const subjectNames = subjects.map((s) => s.subject);

		return NextResponse.json({
			subjects: subjectNames,
		});
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch subjects",
			},
			{
				status: 500,
			}
		);
	}
}
