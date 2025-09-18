"use client";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export default function Hero() {
	const router = useRouter();
	return (
		<div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 max-w-5xl mx-auto">
			{/* Top Badge */}
			<Badge
				variant="outline"
				className="mb-6 bg-white/5 text-white/90 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 animate-pulse"
			>
				✨ Discover 1000+ Free CS Courses
			</Badge>

			{/* Main Heading with improved typography */}
			<h1 className="text-white font-bold font-display mb-4 tracking-tight leading-[0.9]">
				<span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block">
					CoursePool
				</span>
			</h1>

			{/* Subtitle with better spacing and typography */}
			<div className="mb-8 space-y-1">
				<p className="text-gray-200/90 font-display font-medium leading-tight">
					<span className="text-lg sm:text-xl md:text-2xl block">
						Find the Best Computer Science Courses,
					</span>
				</p>
				<p className="text-gray-300/80 font-display font-medium leading-tight">
					<span className="text-lg sm:text-xl md:text-2xl block">
						All in One Place.
					</span>
				</p>
			</div>

			{/* CTA Buttons - Both lead to same page */}
			<div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
				<Button
					onClick={() => router.push("/courses")}
					size="lg"
					className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium px-8 py-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/20"
				>
					<span className="relative z-10">Explore Courses</span>
					<div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				</Button>

				<Button
					onClick={() => router.push("/courses")}
					variant="ghost"
					size="lg"
					className="text-white/80 hover:text-white font-medium px-8 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
				>
					Browse Categories
				</Button>
			</div>

			{/* Feature badges */}
			<div className="flex flex-wrap justify-center gap-3">
				<Badge
					variant="outline"
					className="bg-emerald-500/10 text-emerald-200 border-emerald-400/30 backdrop-blur-sm"
				>
					100% Free
				</Badge>
				<Badge
					variant="outline"
					className="bg-purple-500/10 text-purple-200 border-purple-400/30 backdrop-blur-sm"
				>
					Expert Curated
				</Badge>
				<Badge
					variant="outline"
					className="bg-blue-500/10 text-blue-200 border-blue-400/30 backdrop-blur-sm"
				>
					Always Updated
				</Badge>
			</div>
		</div>
	);
}
