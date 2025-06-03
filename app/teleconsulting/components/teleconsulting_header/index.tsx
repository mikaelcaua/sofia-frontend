'use client';

import React from 'react';
import BrButtonCustomize from '@/components/br_button_customize';

interface TeleconsultingHeaderProps {
  activeTabLabel: string;
  goToSearchSolicitations(): void;
}

export const TeleconsultingHeader: React.FC<TeleconsultingHeaderProps> = ({
  activeTabLabel,
  goToSearchSolicitations,
}) => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between lg:items-start items-center gap-4">
      <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
        <h1 className="text-2xl mb-2">Teleconsultoria</h1>
        <p className="text-gray-600">
          Se nenhuma resposta abaixo atender a sua dúvida, faça uma nova solicitação
        </p>
      </div>

      <BrButtonCustomize
        emphasis="primary"
        className="self-center lg:self-start"
        onClick={goToSearchSolicitations}
      >
        Solicitar Nova Teleconsultoria
      </BrButtonCustomize>
    </section>
  );
};
