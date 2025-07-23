export default function Pagination({ page, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    const pages = [];

    const maxButtons = 5; // số trang hiển thị
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(0, page - half);
    let end = Math.min(totalPages - 1, page + half);

    if (page <= half) {
      end = Math.min(totalPages - 1, maxButtons - 1);
    } else if (page + half >= totalPages) {
      start = Math.max(0, totalPages - maxButtons);
    }

    if (start > 0) {
      pages.push(
        <span key="start" className="px-2">...</span>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-full text-sm font-medium mx-1
            ${i === page ? "bg-red-500 text-white" : "hover:bg-gray-200"}`}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages - 1) {
      pages.push(
        <span key="end" className="px-2">...</span>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 0))}
        disabled={page === 0}
        className={`px-3 py-1 border rounded 
          ${page === 0 ? "text-gray-400 border-gray-300" : "hover:bg-gray-200"}`}
      >
        &lt;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages - 1))}
        disabled={page === totalPages - 1}
        className={`px-3 py-1 border rounded 
          ${page === totalPages - 1 ? "text-gray-400 border-gray-300" : "hover:bg-gray-200"}`}
      >
        &gt;
      </button>
    </div>
  );
}
