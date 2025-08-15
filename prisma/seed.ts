import { PrismaClient } from "@prisma/client";
import { parseCourses } from "@/data/courses";

const prisma = new PrismaClient()
async function seed(){
    const courses = await parseCourses()

    await prisma.courses.createMany({
        data:courses,
        skipDuplicates: true
    })

    console.log("Courses added to db")
}

seed()