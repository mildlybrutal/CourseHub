import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export default async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const courseId = parseInt(id);

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