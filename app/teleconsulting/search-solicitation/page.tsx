'use client';

import { BrMessage, BrTextarea } from '@govbr-ds/webcomponents-react';
import BrButtonCustomize from '@/components/br_button_customize';
import { useState, useMemo, use } from 'react';
import { TeleconsultingTable, TeleconsultingFilters } from '../components/teleconsulting_table';
import { SolicitationInterface } from '@/interfaces/solicitation_interface';
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

const SearchSolicitationScreen = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [solicitationsData, setSolicitationsData] = useState<SolicitationInterface[]>([]);
  const [inputText, setInputText] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleFilterChange = (field: keyof TeleconsultingFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const solicitationsService = new SolicitationService();

  const handleSearch = async () => {
    const data = await solicitationsService.getSolicitationsWithWords(inputText);
    setSolicitationsData(data);
    setCurrentPage(1);
    setFilters(initialFilters);
  };

  const filteredData = useMemo(() => {
    return solicitationsData.filter((item) =>
      (Object.keys(filters) as Array<keyof TeleconsultingFilters>).every((key) => {
        const filterValue = filters[key];
        if (!filterValue) return true;
        const itemValue = String(item[key as keyof SolicitationInterface] ?? '').toLowerCase();
        return itemValue.includes(filterValue.toLowerCase());
      })
    );
  }, [solicitationsData, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalItemsFiltered = filteredData.length;

  const idOptions = useMemo(
    () => solicitationsData.map((item) => ({ value: String(item.id), label: String(item.id) })),
    [solicitationsData]
  );

  const router = useRouter();

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

  return (
    <main className="min-h-screen p-6 flex flex-col gap-6">
      <h1 className="text-2xl mb-2">Pergunte à SOFIA</h1>

      <div className="flex flex-col gap-4">
        <section className="flex">
          <div className="flex flex-col gap-2">
            <p>Olá, Solicitante!</p>
            <p>
              Antes de prosseguir com a sua solicitação, verifique se na SOFIA já existe uma
              resposta para o questionamento que você procura.
            </p>
          </div>
          <BrButtonCustomize
            emphasis="primary"
            onClick={() => router.push('search-solicitation/new-teleconsulting')}
          >
            Solicitar Nova Teleconsultoria
          </BrButtonCustomize>
        </section>

        <div className="flex flex-col gap-2">
          <p>Por favor, descreva sua pergunta:</p>
          <div className="flex w-full gap-4">
            <BrTextarea
              className="w-full"
              placeholder="Descreva sua pergunta"
              value={inputText}
              onInput={(e: any) => setInputText(e.target.value)}
            />
            <BrButtonCustomize
              emphasis="primary"
              className="max-h-12 self-end"
              onClick={handleSearch}
            >
              Pesquisar
            </BrButtonCustomize>
          </div>
        </div>

        {solicitationsData.length > 0 && (
          <div>
            <BrMessage state="warning" show-icon="true" className="min-w-72 w-full">
              Perguntas que possivelmente possuam uma resposta para você
            </BrMessage>
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
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchSolicitationScreen;
