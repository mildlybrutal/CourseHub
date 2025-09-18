"use client";

import axios from "axios";
import { useState, KeyboardEvent } from "react";
import CourseCard from "../components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Search as SearchIcon, Loader2 } from "lucide-react";

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

	const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-6 py-8">
			<motion.div 
				className="flex gap-3 mb-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div 
					className="relative flex-1"
					whileFocus={{ scale: 1.02 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
				>
					<Input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleEnterKey}
						placeholder="Search courses (e.g. best course for operating system)"
						className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 focus:border-white/30 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 focus:shadow-2xl focus:shadow-pink-500/20 transition-all duration-300 rounded-lg px-4 py-3 text-white text-sm w-full pr-12"
						disabled={loading}
					/>
					<SearchIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
				</motion.div>
				
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
				>
					<Button
						onClick={handleSearch}
						disabled={loading || !query.trim()}
						className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<AnimatePresence mode="wait">
							{loading ? (
								<motion.div
									key="loading"
									initial={{ opacity: 0, rotate: 0 }}
									animate={{ opacity: 1, rotate: 360 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<Loader2 className="w-4 h-4 animate-spin" />
								</motion.div>
							) : (
								<motion.span
									key="search"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									Search
								</motion.span>
							)}
						</AnimatePresence>
					</Button>
				</motion.div>
			</motion.div>

			<AnimatePresence mode="wait">
				{loading && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="flex items-center justify-center py-8"
					>
						<div className="flex items-center gap-3 text-emerald-100">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
							>
								<Loader2 className="w-5 h-5" />
							</motion.div>
							<span className="text-lg">Searching for courses...</span>
						</div>
					</motion.div>
				)}

				{!loading && results.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
					>
						{results.map((course, index) => (
							<motion.div
								key={course.url}
								initial={{ opacity: 0, y: 20, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ 
									duration: 0.4, 
									delay: index * 0.1,
									type: "spring",
									stiffness: 300,
									damping: 20
								}}
								whileHover={{ 
									scale: 1.02,
									transition: { duration: 0.2 }
								}}
							>
								<CourseCard
									title={course.title}
									subject={course.subject}
									url={course.url}
									description={course.reason}
								/>
							</motion.div>
						))}
					</motion.div>
				)}

				{!loading && results.length === 0 && query && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="text-center py-12"
					>
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200, damping: 10 }}
						>
							<SearchIcon className="w-12 h-12 text-white/30 mx-auto mb-4" />
							<p className="text-emerald-100/70 text-lg">
								No matching courses found for "{query}"
							</p>
							<p className="text-emerald-100/50 text-sm mt-2">
								Try adjusting your search terms
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
