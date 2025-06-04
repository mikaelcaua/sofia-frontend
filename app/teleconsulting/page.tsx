'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SolicitationInterface } from '@/interfaces/solicitation_interface';
import { useAuth } from '@/hooks/use_auth';
import { TeleconsultingHeader } from './components/teleconsulting_header';
import { TabDefinition, TabKey, TeleconsultingTabs } from './components/teleconsulting_tabs';
import { TeleconsultingTable, TeleconsultingFilters } from './components/teleconsulting_table';
import { useRouter } from 'next/navigation';
import { SolicitationService } from '@/services/solicitation_service';

const initialFilters: TeleconsultingFilters = {
  id: '',
  status: '',
  solicitation: '',
  response: '',
  respondedAt: '',
  updatedAt: '',
};

const TeleconsultingPage = () => {
  const { user } = useAuth();
  const solicitationService = new SolicitationService();

  const [solicitationsData, setSolicitationsData] = useState<SolicitationInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await solicitationService.getSolicitationsByUserId(user?.id || '');
      setSolicitationsData(data);
    };

    if (user?.id) {
      fetchData();
    }
  }, [user?.id]);

  const [activeTab, setActiveTab] = useState<TabKey>('respondidas');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(initialFilters);

  const TABS: ReadonlyArray<TabDefinition> = useMemo(
    () => [
      { key: 'respondidas', label: 'Respondidas', status: ['Avaliada', 'Aguarda avaliação'] },
      { key: 'devolvidas', label: 'Devolvidas/Canceladas', status: ['Devolvida', 'Cancelada'] },
      { key: 'enviadas', label: 'Solicitações Enviadas', status: ['Enviada'] },
      { key: 'rascunhos', label: 'Rascunhos', status: ['Rascunho'] },
    ],
    []
  );

  const handleFilterChange = (field: keyof TeleconsultingFilters, value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const handleTabChange = (tabKey: TabKey) => {
    setActiveTab(tabKey);
    setCurrentPage(1);
    setFilters(initialFilters);
  };

  const filteredData = useMemo(() => {
    const currentTab = TABS.find((tab) => tab.key === activeTab);
    if (!currentTab) return [];

    return solicitationsData.filter((item) => {
      if (!currentTab.status.includes(item.status)) {
        return false;
      }

      return (Object.keys(filters) as Array<keyof TeleconsultingFilters>).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true;

        const itemValue = String(item[key as keyof SolicitationInterface] ?? '').toLowerCase();
        return itemValue.includes(filterValue.toLowerCase());
      });
    });
  }, [solicitationsData, filters, activeTab, TABS]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalItemsFiltered = filteredData.length;

  const tabCounts = useMemo(() => {
    const counts: { [K in TabKey]?: number } = {};
    TABS.forEach((tab) => {
      counts[tab.key] = solicitationsData.filter((item) => tab.status.includes(item.status)).length;
    });
    return counts;
  }, [solicitationsData, TABS]);

  const idOptions = useMemo(
    () => solicitationsData.map((item) => ({ value: String(item.id), label: String(item.id) })),
    [solicitationsData]
  );

  const statusOptions = useMemo(
    () => [
      { value: 'Avaliada', label: 'Avaliada' },
      { value: 'Aguarda avaliação', label: 'Aguarda avaliação' },
      { value: 'Devolvida', label: 'Devolvida' },
      { value: 'Cancelada', label: 'Cancelada' },
      { value: 'Enviada', label: 'Enviada' },
      { value: 'Rascunho', label: 'Rascunho' },
    ],
    []
  );

  const activeTabLabel = TABS.find((tab) => tab.key === activeTab)?.label || '';

  const router = useRouter();

  function goToSearchSolicitations(): void {
    router.push('/teleconsulting/search-solicitation');
  }

  return (
    <main className="w-full px-4 py-6 min-h-screen flex flex-col gap-6">
      <TeleconsultingHeader
        activeTabLabel={activeTabLabel}
        goToSearchSolicitations={goToSearchSolicitations}
      />

      <TeleconsultingTabs
        tabs={TABS}
        activeTab={activeTab}
        tabCounts={tabCounts}
        onTabChange={handleTabChange}
      />

      <TeleconsultingTable
        data={paginatedData}
        filters={filters}
        onFilterChange={handleFilterChange}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItemsFiltered}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(value);
          setCurrentPage(1);
        }}
        idOptions={idOptions}
        statusOptions={statusOptions}
      />
    </main>
  );
};

export default TeleconsultingPage;
