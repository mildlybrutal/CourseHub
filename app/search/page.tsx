"use client";

import axios from "axios";
import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

	async function handleSearch() {
		if (!query.trim()) return;
		setLoading(true);
		try {
			const res = await axios.post("/api/rag", { query });
			setResults(res.data.recommendations);
		} catch (err) {
			console.error("Search failed:", err);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="max-w-7xl mx-auto px-6 py-8">
			<div className="flex gap-2 mb-6">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search courses (e.g. best course for operating system)"
					className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 rounded-lg px-3 py-2 text-white text-sm w-full"
				/>
				<button
					onClick={handleSearch}
					className=" px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
				>
					{/* px-4 py-2 */}
					Search
				</button>
			</div>
			{loading && <p className="text-emerald-100">Searching...</p>}

			{!loading && results.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{results.map((course) => (
						<CourseCard
							key={course.url}
							title={course.title}
							subject={course.subject}
							url={course.url}
						/>
					))}
				</div>
			)}
			{!loading && results.length === 0 && query && (
				<p className="text-emerald-100/70">
					No matching courses found.
				</p>
			)}
		</div>
	);
}
