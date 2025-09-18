import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react"

interface CardProps {
	title: string;
	subject: string;
	url: string;
	description?: string;
}

export default function CourseCard({
	title,
	subject,
	url,
	description,
}: CardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			whileHover={{ y: -2 }}
			whileTap={{ scale: 0.995 }}
			className="relative"
		>
			<Card className="relative bg-white/5 backdrop-blur-sm border-white/10 shadow-xl min-h-[280px]">
				<CardHeader className="relative z-10">
					<div className="flex items-center justify-between mb-2">
						<motion.div
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.2, delay: 0.1 }}
						>
							<Badge
								variant="outline"
								className="bg-blue-500/15 text-blue-200 border-blue-400/30 backdrop-blur-sm"
							>
								{subject}
							</Badge>
						</motion.div>
						<div className="w-2 h-2 bg-blue-300/70 rounded-full shadow-sm" />
					</div>

					<motion.h3 
						className="text-xl font-bold text-white line-clamp-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						{title}
					</motion.h3>

					<motion.div 
						className="h-0.5 bg-gradient-to-r from-blue-400/80 via-cyan-400/60 to-indigo-500/80"
						initial={{ width: 0 }}
						animate={{ width: "3rem" }}
						transition={{ duration: 0.4, delay: 0.3 }}
					/>
				</CardHeader>

				<CardContent className="relative z-10 flex-1">
					{description && (
						<motion.p 
							className="text-sm text-white/70"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.4 }}
						>
							{description}
						</motion.p>
					)}
				</CardContent>

				<CardFooter className="relative z-10 mt-auto">
					<motion.div 
						className="w-full"
						whileHover={{ scale: 1.01 }}
						whileTap={{ scale: 0.99 }}
						transition={{ duration: 0.1 }}
					>
						<Button
							asChild
							className="w-full bg-blue-500/15 text-blue-100 border-blue-400/30 backdrop-blur-sm"
							variant="outline"
						>
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center w-full"
							>
								<span className="mr-2 font-medium">Start Learning</span>
								<motion.svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									whileHover={{ x: 2 }}
									transition={{ duration: 0.2 }}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									/>
								</motion.svg>
							</a>
						</Button>
					</motion.div>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
