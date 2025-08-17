import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "../.env") });

import { PrismaClient } from "../generated/prisma";
import { parseCourses } from "./courses";

const prisma = new PrismaClient();

async function seed() {
	const courses = await parseCourses();

	await prisma.course.createMany({
		data: courses,
		skipDuplicates: true,
	});

	console.log("Courses added to db");
}

seed();
