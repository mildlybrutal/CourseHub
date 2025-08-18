-- CreateTable
CREATE TABLE "public"."CourseTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CourseToCourseTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToCourseTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseTag_name_key" ON "public"."CourseTag"("name");

-- CreateIndex
CREATE INDEX "_CourseToCourseTag_B_index" ON "public"."_CourseToCourseTag"("B");

-- AddForeignKey
ALTER TABLE "public"."_CourseToCourseTag" ADD CONSTRAINT "_CourseToCourseTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CourseToCourseTag" ADD CONSTRAINT "_CourseToCourseTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."CourseTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
