import { ChangeEvent } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function PaginationControls({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageOptions = Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-200">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Exibir</span>
          <select
            value={itemsPerPage}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onItemsPerPageChange(Number(e.target.value))
            }
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <span className="text-sm hidden lg:block">
          {totalItems > 0
            ? `${startItem}-${endItem} de ${totalItems} itens`
            : 'Nenhum item encontrado'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Página</span>
        <select
          value={currentPage}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          disabled={totalItems === 0}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {String(page).padStart(2, '0')}
            </option>
          ))}
        </select>
        <div className="flex">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalItems === 0}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'<'}
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalItems === 0}
            className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
