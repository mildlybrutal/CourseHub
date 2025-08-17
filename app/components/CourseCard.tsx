interface CardProps {
	title: string;
	subject: string;
	url: string;
}

export default function CourseCard({ title, subject, url }: CardProps) {
	return (
		<div className="group relative bg-gradient-to-br from-emerald-900/20 to-black/40 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-400/40 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between min-h-[280px] hover:scale-[1.02] hover:-translate-y-1">
			{/* Emerald glow effect on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

			{/* Subtle inner glow */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/5 via-transparent to-transparent opacity-60"></div>

			<div className="relative z-10">
				{/* Subject badge */}
				<div className="flex items-center justify-between mb-4">
					<span className="px-3 py-1.5 text-xs font-semibold text-emerald-50 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full shadow-lg shadow-emerald-600/25">
						{subject}
					</span>
					<div className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"></div>
				</div>

				{/* Title */}
				<h3 className="text-xl font-bold text-white mb-3 line-clamp-3 group-hover:text-emerald-50 transition-colors duration-200">
					{title}
				</h3>

				{/* Decorative line */}
				<div className="w-12 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 mb-6 group-hover:w-20 transition-all duration-300 shadow-sm shadow-emerald-400/50"></div>
			</div>

			{/* Action button */}
			<div className="relative z-10 mt-auto">
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="group/btn inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]"
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
			</div>

			{/* Outer glow effect */}
			<div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-emerald-800/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

			{/* Subtle border enhancement */}
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
		</div>
	);
}
