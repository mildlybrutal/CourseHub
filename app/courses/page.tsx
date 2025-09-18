"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import PaginationWrapper from "../components/Pagination";
import Search from "../search/page";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface PaginationInfo {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export default function Courses() {
	const router = useRouter();
	const [courses, setCourses] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState<PaginationInfo>({
		total: 0,
		page: 1,
		limit: 20,
		totalPages: 0,
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedSubject, setSelectedSubject] = useState<string>("");
	const [subjects, setSubjects] = useState<string[]>([]);

	const fetchCourses = async (
		page: number = 1,
		limit: number = 20,
		subject?: string
	) => {
		setLoading(true);
		try {
			let url = `/api/courses?page=${page}&limit=${limit}`;
			if (subject && subject !== "") {
				url += `&subject=${encodeURIComponent(subject)}`;
			}

			const res = await axios.get(url);
			setCourses(res.data.data);
			setPagination(res.data.pagination);
		} catch (error) {
			console.error("Error fetching courses:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchSubjects = async () => {
		try {
			const res = await axios.get("/api/subjects");
			setSubjects(res.data.subjects);
		} catch (error) {
			console.error("Error fetching subjects:", error);
			// Fallback: extract subjects from current courses
			const uniqueSubjects = [
				...new Set(courses.map((course) => course.subject)),
			];
			setSubjects(uniqueSubjects);
		}
	};

	useEffect(() => {
		fetchCourses(currentPage, 20, selectedSubject);
	}, [currentPage, selectedSubject]);

	useEffect(() => {
		fetchSubjects();
	}, []);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleSubjectChange = (subject: string) => {
		setSelectedSubject(subject);
		setCurrentPage(1); // Reset to first page when filtering
	};

	const clearFilter = () => {
		setSelectedSubject("");
		setCurrentPage(1);
	};

	if (loading && courses.length === 0) {
		return (
			<div className="min-h-screen w-full relative">
				{/* Background matching hero design */}
				<div
					className="absolute inset-0 z-0"
					style={{
						background: "#020617",
						backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
						backgroundSize: "40px 40px, 40px 40px, 100% 100%",
					}}
				/>

				<div className="relative z-10 flex items-center justify-center min-h-screen">
					<div className="flex flex-col items-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/40"></div>
						<p className="mt-4 text-white/70">Loading courses...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full relative bg-[#020617]">
			{/* Background matching hero design */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background: "#020617",
					backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
        radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
      `,
					backgroundSize: "40px 40px, 40px 40px, 100% 100%",
				}}
			/>

			{/* Content with proper z-index */}
			<div className="relative z-10">
				{/* Header */}
				<div className="bg-white/5 backdrop-blur-sm shadow-sm border-b border-white/10">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<div className="flex justify-between items-center">
							<div
								className="cursor-default hover:cursor-pointer"
								onClick={() => router.push("/")}
							>
								<h1 className="text-3xl font-bold text-white">
									CoursePool
								</h1>
								<p className="mt-2 text-white/70 text-sm">
									All of Computer Science Courses, in one
									place. • Version 1.0
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Search />
				</div>
				{/* Filter Section */}
				<div className="max-w-7xl mx-auto px-6 py-6 border-b border-white/10">
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex items-center gap-2">
							<Label
								htmlFor="subject-filter"
								className="text-white/70 text-sm font-medium"
							>
								Filter by Subject:
							</Label>
							<select
								id="subject-filter"
								value={selectedSubject}
								onChange={(e) =>
									handleSubjectChange(e.target.value)
								}
								className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 backdrop-blur-sm"
							>
								<option value="">All Subjects</option>
								{subjects.map((subject) => (
									<option
										key={subject}
										value={subject}
										className="bg-slate-900 text-white"
									>
										{subject}
									</option>
								))}
							</select>
						</div>

						{selectedSubject && (
							<Button
								onClick={clearFilter}
								variant="outline"
								size="sm"
								className="bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
							>
								Clear Filter
							</Button>
						)}

						<div className="text-white/60 text-sm">
							{loading ? (
								<span className="flex items-center gap-2">
									<div className="animate-spin rounded-full h-4 w-4 border-b border-white/40"></div>
									Filtering...
								</span>
							) : (
								<Badge
									variant="outline"
									className="bg-white/5 border-white/20 text-white/70"
								>
									{pagination.total} course
									{pagination.total !== 1 ? "s" : ""}
									{selectedSubject
										? ` in ${selectedSubject}`
										: ""}
								</Badge>
							)}
						</div>
					</div>
				</div>

				{/* Courses Grid */}
				<div className="max-w-7xl mx-auto px-6 py-8">
					{courses.length === 0 && !loading ? (
						<div className="text-center py-12">
							<div className="text-white/60 text-lg">
								No courses found
								{selectedSubject
									? ` for subject "${selectedSubject}"`
									: ""}
							</div>
							{selectedSubject && (
								<Button
									onClick={clearFilter}
									variant="outline"
									className="mt-4 bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
								>
									View All Courses
								</Button>
							)}
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
								{courses.map((course) => (
									<CourseCard
										key={course.id}
										title={course.title}
										subject={course.subject}
										url={course.url}
										description={course.description}
									/>
								))}
							</div>

							{/* Pagination Component */}
							{pagination.totalPages > 1 && (
								<PaginationWrapper
									currentPage={pagination.page}
									totalPages={pagination.totalPages}
									onPageChange={handlePageChange}
									totalItems={pagination.total}
									itemsPerPage={pagination.limit}
									className="mt-12"
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
