import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Previous button
    pages.push(
      <button
        key="prev"
        className={`p-2 rounded-lg border border-gray-300 text-primary hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    );
    
    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`w-10 h-10 rounded-lg border border-gray-300 text-primary hover:bg-gray-50 ${1 === currentPage ? 'bg-primary/10 border-accent' : ''}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-2 text-muted">
            ...
          </span>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`w-10 h-10 rounded-lg border border-gray-300 text-primary hover:bg-gray-50 ${i === currentPage ? 'bg-primary/10 border-accent' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-2 text-muted">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          className={`w-10 h-10 rounded-lg border border-gray-300 text-primary hover:bg-gray-50 ${totalPages === currentPage ? 'bg-primary/10 border-accent' : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    
    // Next button
    pages.push(
      <button
        key="next"
        className={`p-2 rounded-lg border border-gray-300 text-primary hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    );
    
    return pages;
  };

  return (
    <div className="mt-12 flex justify-center">
      <nav className="flex items-center space-x-2">
        {renderPageNumbers()}
      </nav>
    </div>
  );
};

export default Pagination;
