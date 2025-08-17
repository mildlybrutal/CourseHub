interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems?: number;
	itemsPerPage?: number;
	className?: string;
}

export default function Pagination({ 
	currentPage, 
	totalPages, 
	onPageChange,
	totalItems,
	itemsPerPage,
	className = ""
}: PaginationProps) {
	const getPaginationButtons = () => {
		const buttons = [];
		
		// Previous button
		if (currentPage > 1) {
			buttons.push(
				<button
					key="prev"
					onClick={() => onPageChange(currentPage - 1)}
					className="flex items-center px-4 py-2.5 mx-1 text-sm font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:border-emerald-400/40 rounded-lg hover:bg-black/60 transition-all duration-200"
				>
					<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
					<span className="tracking-wide">Previous</span>
				</button>
			);
		}

		// Page numbers (show current page and 2 pages before/after)
		const startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, currentPage + 2);

		// First page + ellipsis
		if (startPage > 1) {
			buttons.push(
				<button
					key={1}
					onClick={() => onPageChange(1)}
					className="px-4 py-2.5 mx-1 text-sm font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-lg hover:bg-black/60 transition-all duration-200"
				>
					1
				</button>
			);
			if (startPage > 2) {
				buttons.push(
					<span key="ellipsis1" className="px-2 py-2.5 text-sm font-medium text-white/60">
						...
					</span>
				);
			}
		}

		// Main page buttons
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => onPageChange(i)}
					className={`px-4 py-2.5 mx-1 text-sm font-medium rounded-lg transition-all duration-200 ${
						i === currentPage
							? 'text-black bg-emerald-400 border border-emerald-400 shadow-lg'
							: 'text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-black/60'
					}`}
				>
					{i}
				</button>
			);
		}

		// Last page + ellipsis
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				buttons.push(
					<span key="ellipsis2" className="px-2 py-2.5 text-sm font-medium text-white/60">
						...
					</span>
				);
			}
			buttons.push(
				<button
					key={totalPages}
					onClick={() => onPageChange(totalPages)}
					className="px-4 py-2.5 mx-1 text-sm font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-lg hover:bg-black/60 transition-all duration-200"
				>
					{totalPages}
				</button>
			);
		}

		// Next button
		if (currentPage < totalPages) {
			buttons.push(
				<button
					key="next"
					onClick={() => onPageChange(currentPage + 1)}
					className="flex items-center px-4 py-2.5 mx-1 text-sm font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 hover:border-emerald-400/40 rounded-lg hover:bg-black/60 transition-all duration-200"
				>
					<span className="tracking-wide">Next</span>
					<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			);
		}

		return buttons;
	};

	// Don't render if there's only one page or no pages
	if (totalPages <= 1) {
		return null;
	}

	// Calculate showing range
	const startItem = totalItems && itemsPerPage ? ((currentPage - 1) * itemsPerPage) + 1 : null;
	const endItem = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null;

	return (
		<div className={`flex flex-col items-center space-y-4 ${className}`}>
			<div className="flex flex-wrap justify-center items-center">
				{getPaginationButtons()}
			</div>
			<div className="text-sm font-medium text-white/70 tracking-wide">
				Page <span className="text-emerald-400 font-semibold">{currentPage}</span> of <span className="text-white">{totalPages}</span>
			</div>
			{totalItems && itemsPerPage && (
				<div className="text-xs text-white/50 tracking-wide">
					Showing {startItem} to {endItem} of {totalItems} courses
				</div>
			)}
		</div>
	);
}