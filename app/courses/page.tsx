"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import Pagination from "../components/Pagination";

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

	const fetchCourses = async (page: number = 1, limit: number = 20) => {
		setLoading(true);
		try {
			const res = await axios.get(
				`/api/courses?page=${page}&limit=${limit}`
			);
			setCourses(res.data.data);
			setPagination(res.data.pagination);
		} catch (error) {
			console.error("Error fetching courses:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses(currentPage);
	}, [currentPage]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (loading) {
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
									All of Computer Science Courses, in one place. • Version 1.0
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Courses Grid */}
				<div className="max-w-7xl mx-auto px-6 py-8">
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
					<Pagination
						currentPage={pagination.page}
						totalPages={pagination.totalPages}
						onPageChange={handlePageChange}
						totalItems={pagination.total}
						itemsPerPage={pagination.limit}
						className="mt-12"
					/>
				</div>
			</div>
		</div>
	);
}
