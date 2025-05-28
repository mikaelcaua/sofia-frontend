'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { RequestInterface } from '@/interfaces/request_interface';
import { TableFilter } from '@/components/table_filter';
import { PaginationControls } from '@/components/pagination_controls';
import { useAuth } from '@/context/auth_context';
import BrButtonCustomize from '@/components/br_button_customize';

type TabKey = 'respondidas' | 'devolvidas' | 'enviadas' | 'rascunhos';

interface TabDefinition {
  key: TabKey;
  label: string;
  status: RequestInterface['status'][];
}

const initialFilters = {
  id: '',
  status: '',
  solicitacao: '',
  resposta: '',
  respondidaEm: '',
  atualizadaEm: '',
};

const TeleconsultoriaPage = () => {
  const { user } = useAuth();
  const MOCK_DATA: RequestInterface[] = user?.requests || [];

  const [activeTab, setActiveTab] = useState<TabKey>('respondidas');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const TABS: ReadonlyArray<TabDefinition> = useMemo(() => ([
    { key: 'respondidas', label: 'Respondidas', status: ['Avaliada', 'Aguarda avaliação'] },
    { key: 'devolvidas', label: 'Devolvidas/Canceladas', status: ['Devolvida', 'Cancelada'] },
    { key: 'enviadas', label: 'Solicitações Enviadas', status: ['Enviada'] },
    { key: 'rascunhos', label: 'Rascunhos', status: ['Rascunho'] }
  ]), []);

  const getStatusBadge = (status: RequestInterface['status']) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium inline-block';
    switch (status) {
      case 'Avaliada':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Aguarda avaliação':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Devolvida':
      case 'Cancelada':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'Enviada':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Rascunho':
        return `${baseClasses} bg-gray-200 text-gray-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleFilterChange = (field: keyof typeof initialFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    const currentTab = TABS.find(tab => tab.key === activeTab);
    if (!currentTab) return [];

    return MOCK_DATA.filter(item => {
      // Filter by active tab's statuses
      if (!currentTab.status.includes(item.status)) {
        return false;
      }

      // Apply text/select filters
      return (Object.keys(filters) as Array<keyof typeof initialFilters>).every(key => {
        const filterValue = filters[key];
        if (!filterValue) return true; // If filter is empty, don't filter by this key

        const itemValue = String(item[key as keyof RequestInterface] ?? '').toLowerCase();
        return itemValue.includes(filterValue.toLowerCase());
      });
    });
  }, [MOCK_DATA, filters, activeTab, TABS]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalItemsFiltered = filteredData.length;

  const tabCounts = useMemo(() => {
    const counts: { [K in TabKey]?: number } = {};
    TABS.forEach(tab => {
      counts[tab.key] = MOCK_DATA.filter(item => tab.status.includes(item.status)).length;
    });
    return counts;
  }, [MOCK_DATA, TABS]);

  // Memoized options for select filters
  const idOptions = useMemo(() =>
    MOCK_DATA.map(item => ({ value: String(item.id), label: String(item.id) })),
    [MOCK_DATA]
  );

  const statusOptions = useMemo(() => (
    [
      { value: 'Avaliada', label: 'Avaliada' },
      { value: 'Aguarda avaliação', label: 'Aguarda avaliação' },
      { value: 'Devolvida', label: 'Devolvida' },
      { value: 'Cancelada', label: 'Cancelada' },
      { value: 'Enviada', label: 'Enviada' },
      { value: 'Rascunho', label: 'Rascunho' },
    ]
  ), []);

  return (
    <main className="container px-4 py-6 min-h-screen bg-gray-50 flex flex-col gap-6">

      <section className='flex flex-wrap justify-between items-start gap-4'>
        <div>
          <h1 className="text-2xl mb-2">
            Teleconsultoria
            <span className="text-gray-600 text-base font-normal ml-2">
              - Solicitações {TABS.find(tab => tab.key === activeTab)?.label}
            </span>
          </h1>
          <p className="text-gray-600">
            Se nenhuma resposta abaixo atender a sua dúvida, faça uma nova solicitação
          </p>
        </div>
        <div>
          <BrButtonCustomize emphasis='primary'>Solicitar Nova Teleconsultoria</BrButtonCustomize>
        </div>
      </section>

      {/* Section 2: Tabs Navigation */}
      <div>
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key); // Type safe now
                  setCurrentPage(1);
                  setFilters(initialFilters); // Reset filters using the constant
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                  ({tabCounts[tab.key] || 0}) {/* Ensure count is displayed even if 0 */}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="ID"
                    value={filters.id}
                    onChange={(value) => handleFilterChange('id', value)}
                    options={idOptions} // Use memoized options
                    type="select"
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="Status"
                    value={filters.status}
                    onChange={(value) => handleFilterChange('status', value)}
                    options={statusOptions}
                    type="select"
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="Solicitação"
                    value={filters.solicitacao}
                    onChange={(value) => handleFilterChange('solicitacao', value)}
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="Resposta"
                    value={filters.resposta}
                    onChange={(value) => handleFilterChange('resposta', value)}
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="Respondida em"
                    value={filters.respondidaEm}
                    onChange={(value) => handleFilterChange('respondidaEm', value)}
                  />
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  <TableFilter
                    label="Atualizada em"
                    value={filters.atualizadaEm}
                    onChange={(value) => handleFilterChange('atualizadaEm', value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-4 text-blue-600 font-medium">
                      <Link href={`/teleconsultoria/${item.id}`} className="hover:underline">
                        {item.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className={getStatusBadge(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-blue-600">
                      <Link href={`/teleconsultoria/${item.id}`} className="hover:underline">
                        {item.solicitation}
                      </Link>
                    </td>
                    <td className="p-4 text-blue-600">
                      <Link href={`/teleconsultoria/${item.id}`} className="hover:underline">
                        {item.response || 'N/A'}
                      </Link>
                    </td>
                    <td className="p-4 text-gray-700">{item.respondedAt || 'N/A'}</td>
                    <td className="p-4 text-gray-700">{item.updatedAt || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
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
          totalItems={totalItemsFiltered}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
    </main>
  );
};

export default TeleconsultoriaPage;