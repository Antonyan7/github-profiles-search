import React from 'react';
import { Button } from '@/src/components/ui/button';
interface Props {
  currentPage?: number;
  totalCount?: number;
  perPage?: number;
  maxVisible?: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalCount,
  perPage = 12,
  maxVisible = 10,
  onPageChange,
}: Props) {
  const totalPages = Math.min(100, Math.ceil(totalCount / perPage));
  const startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);
  const pageRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex gap-2 justify-center mt-6 flex-wrap">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-600 disabled:opacity-50"
      >
        Prev
      </Button>

      {pageRange.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-400'
          }`}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-600 disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
}
