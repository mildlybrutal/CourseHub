import { 
	Pagination, 
	PaginationContent, 
	PaginationItem, 
	PaginationLink, 
	PaginationNext, 
	PaginationPrevious, 
	PaginationEllipsis 
} from "@/components/ui/pagination";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	totalItems?: number;
	itemsPerPage?: number;
	className?: string;
}

export default function PaginationWrapper({ 
	currentPage, 
	totalPages, 
	onPageChange,
	totalItems,
	itemsPerPage,
	className = ""
}: PaginationProps) {
	const getPaginationItems = () => {
		const items = [];
		
		// Previous button
		if (currentPage > 1) {
			items.push(
				<PaginationItem key="prev">
					<PaginationPrevious 
						href="#" 
						onClick={(e) => {
							e.preventDefault();
							onPageChange(currentPage - 1);
						}}
						className="text-white bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/20"
					/>
				</PaginationItem>
			);
		}

		// Page numbers (show current page and 2 pages before/after)
		const startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, currentPage + 2);

		// First page + ellipsis
		if (startPage > 1) {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink 
						href="#" 
						onClick={(e) => {
							e.preventDefault();
							onPageChange(1);
						}}
						className="text-white bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/20"
					>
						1
					</PaginationLink>
				</PaginationItem>
			);
			if (startPage > 2) {
				items.push(
					<PaginationItem key="ellipsis1">
						<PaginationEllipsis className="text-white/60" />
					</PaginationItem>
				);
			}
		}

		// Main page buttons
		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink 
						href="#" 
						onClick={(e) => {
							e.preventDefault();
							onPageChange(i);
						}}
						isActive={i === currentPage}
						className={
							i === currentPage
								? 'text-black bg-white border-white shadow-lg'
								: 'text-white bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/20'
						}
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		// Last page + ellipsis
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				items.push(
					<PaginationItem key="ellipsis2">
						<PaginationEllipsis className="text-white/60" />
					</PaginationItem>
				);
			}
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink 
						href="#" 
						onClick={(e) => {
							e.preventDefault();
							onPageChange(totalPages);
						}}
						className="text-white bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/20"
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			);
		}

		// Next button
		if (currentPage < totalPages) {
			items.push(
				<PaginationItem key="next">
					<PaginationNext 
						href="#" 
						onClick={(e) => {
							e.preventDefault();
							onPageChange(currentPage + 1);
						}}
						className="text-white bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/30 hover:bg-white/20"
					/>
				</PaginationItem>
			);
		}

		return items;
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
			<Pagination>
				<PaginationContent>
					{getPaginationItems()}
				</PaginationContent>
			</Pagination>
			<div className="text-sm font-medium text-white/70 tracking-wide">
				Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white">{totalPages}</span>
			</div>
			{totalItems && itemsPerPage && (
				<div className="text-xs text-white/50 tracking-wide">
					Showing {startItem} to {endItem} of {totalItems} courses
				</div>
			)}
		</div>
	);
}