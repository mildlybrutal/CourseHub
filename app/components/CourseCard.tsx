import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CardProps {
	title: string;
	subject: string;
	url: string;
}

export default function CourseCard({ title, subject, url }: CardProps) {
	return (
		<Card className="group relative bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 shadow-xl hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300 min-h-[280px] hover:scale-[1.02] hover:-translate-y-1">
			{/* Subtle glow effect on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

			{/* Subtle inner glow */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60"></div>

			<CardHeader className="relative z-10">
				{/* Subject badge and indicator */}
				<div className="flex items-center justify-between mb-2">
					<Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
						{subject}
					</Badge>
					<div className="w-2 h-2 bg-white/60 rounded-full shadow-sm"></div>
				</div>

				{/* Title */}
				<h3 className="text-xl font-bold text-white line-clamp-3 group-hover:text-white/90 transition-colors duration-200">
					{title}
				</h3>

				{/* Decorative line */}
				<div className="w-12 h-0.5 bg-gradient-to-r from-pink-400/80 to-purple-500/80 group-hover:w-20 transition-all duration-300 shadow-sm"></div>
			</CardHeader>

			<CardContent className="relative z-10 flex-1">
				{/* Content area can be expanded if needed */}
			</CardContent>

			<CardFooter className="relative z-10 mt-auto">
				<Button 
					asChild 
					className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm"
					variant="outline"
				>
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className="group/btn inline-flex items-center justify-center w-full"
					>
						<span className="mr-2">Explore Course</span>
						<svg
							className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</a>
				</Button>
			</CardFooter>

			{/* Outer glow effect */}
			<div className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

			{/* Subtle border enhancement */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
		</Card>
	);
}
