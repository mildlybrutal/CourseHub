"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";
import Search from "../search/page";

interface PaginationInfo {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export default function Courses() {
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
			<div className="min-h-screen w-full relative bg-black">
				{/* Emerald Depths Background with Top Glow */}
				<div
					className="absolute inset-0 z-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
					}}
				/>

				<div className="relative z-10 flex items-center justify-center min-h-screen">
					<div className="flex flex-col items-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
						<p className="mt-4 text-emerald-100/80">
							Loading courses...
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full relative bg-black">
			{/* Emerald Depths Background with Top Glow */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000",
				}}
			/>

			{/* Content with proper z-index */}
			<div className="relative z-10">
				{/* Header */}
				<div className="bg-black/20 backdrop-blur-sm shadow-sm border-b border-emerald-500/20">
					<div className="max-w-7xl mx-auto px-6 py-8">
						<div className="flex justify-between items-center">
							<div>
								<h1 className="text-3xl font-bold text-white">
									CourseHub
								</h1>
								<p className="mt-2 text-emerald-100/80 text-sm">
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
				<div className="max-w-7xl mx-auto px-6 py-6 border-b border-emerald-500/10">
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex items-center gap-2">
							<label
								htmlFor="subject-filter"
								className="text-emerald-100/80 text-sm font-medium"
							>
								Filter by Subject:
							</label>
							<select
								id="subject-filter"
								value={selectedSubject}
								onChange={(e) =>
									handleSubjectChange(e.target.value)
								}
								className="bg-gray-900 border border-emerald-500/30 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 backdrop-blur-sm"
							>
								<option value="">All Subjects</option>
								{subjects.map((subject) => (
									<option
										key={subject}
										value={subject}
										className="bg-gray-900 text-white"
									>
										{subject}
									</option>
								))}
							</select>
						</div>

						{selectedSubject && (
							<button
								onClick={clearFilter}
								className="px-3 py-1 text-xs bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 hover:bg-emerald-500/30 transition-colors"
							>
								Clear Filter
							</button>
						)}

						<div className="text-emerald-100/60 text-sm">
							{loading ? (
								<span className="flex items-center gap-2">
									<div className="animate-spin rounded-full h-4 w-4 border-b border-emerald-400"></div>
									Filtering...
								</span>
							) : (
								`Showing ${pagination.total} course${
									pagination.total !== 1 ? "s" : ""
								}${
									selectedSubject
										? ` in ${selectedSubject}`
										: ""
								}`
							)}
						</div>
					</div>
				</div>

				{/* Courses Grid */}
				<div className="max-w-7xl mx-auto px-6 py-8">
					{courses.length === 0 && !loading ? (
						<div className="text-center py-12">
							<div className="text-emerald-100/60 text-lg">
								No courses found
								{selectedSubject
									? ` for subject "${selectedSubject}"`
									: ""}
							</div>
							{selectedSubject && (
								<button
									onClick={clearFilter}
									className="mt-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-300 hover:bg-emerald-500/30 transition-colors"
								>
									View All Courses
								</button>
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
									/>
								))}
							</div>

							{/* Pagination Component */}
							{pagination.totalPages > 1 && (
								<Pagination
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
