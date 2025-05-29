'use client';

import React from 'react';
import Link from 'next/link';
import { SolicitationInterface } from '@/interfaces/solicitation_interface';
import { TableFilter } from '../table_filter';
import { PaginationControls } from '../pagination_controls';

export interface TeleconsultingFilters {
  id: string;
  status: string;
  solicitation: string;
  response: string;
  respondedAt: string;
  updatedAt: string;
}

interface TeleconsultingTableProps {
  data: SolicitationInterface[];
  filters: TeleconsultingFilters;
  onFilterChange: (field: keyof TeleconsultingFilters, value: string) => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  idOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
}

export const TeleconsultingTable: React.FC<TeleconsultingTableProps> = ({
  data,
  filters,
  onFilterChange,
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  idOptions,
  statusOptions
}) => {
  const getStatusBadge = (status: SolicitationInterface['status']) => {
    const baseClasses = ' py-2 w-[9rem] rounded-md text-xs font-medium inline-block text-white flex items-center justify-center';
    switch (status) {
      case 'Avaliada':
        return `${baseClasses} bg-green_color`;
      case 'Aguarda avaliação':
        return `${baseClasses} bg-[#76766a]`;
      case 'Devolvida':
      case 'Cancelada':
        return `${baseClasses} bg-red-100`;
      case 'Enviada':
        return `${baseClasses} bg-blue-100`;
      case 'Rascunho':
        return `${baseClasses} bg-gray-200`;
      default:
        return `${baseClasses} bg-gray-100`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium ">
                <TableFilter
                  label="ID"
                  value={filters.id}
                  onChange={(value) => onFilterChange('id', value)}
                  options={idOptions}
                  type="select"
                />
              </th>
              <th className="text-left p-4 font-medium">
                <TableFilter
                  label="Status"
                  value={filters.status}
                  onChange={(value) => onFilterChange('status', value)}
                  options={statusOptions}
                  type="select"
                />
              </th>
              <th className="text-left p-4 font-medium ">
                <TableFilter
                  label="Solicitação"
                  value={filters.solicitation}
                  onChange={(value) => onFilterChange('solicitation', value)}
                />
              </th>
              <th className="text-left p-4 font-medium ">
                <TableFilter
                  label="Resposta"
                  value={filters.response}
                  onChange={(value) => onFilterChange('response', value)}
                />
              </th>
              <th className="text-left p-4 font-medium ">
                <TableFilter
                  label="Respondida em"
                  value={filters.respondedAt}
                  onChange={(value) => onFilterChange('respondedAt', value)}
                />
              </th>
              <th className="text-left p-4 font-medium ">
                <TableFilter
                  label="Atualizada em"
                  value={filters.updatedAt}
                  onChange={(value) => onFilterChange('updatedAt', value)}
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 text-blue-600 font-medium">
                    <Link href={`/Teleconsulting/${item.id}`} className="hover:underline">
                      {item.id}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className={getStatusBadge(item.status)}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-blue-600">
                    <Link href={`/Teleconsulting/${item.id}`} className="hover:underline">
                      {item.solicitation}
                    </Link>
                  </td>
                  <td className="p-4 text-blue-600">
                    <Link href={`/Teleconsulting/${item.id}`} className="hover:underline">
                      {item.response || 'N/A'}
                    </Link>
                  </td>
                  <td className="p-4">{item.respondedAt || 'N/A'}</td>
                  <td className="p-4">{item.updatedAt || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  Nenhuma solicitação encontrada com os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  );
};