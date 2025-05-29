'use client';

import React from 'react';
import BrButtonCustomize from '@/components/br_button_customize';

interface TeleconsultingHeaderProps {
  activeTabLabel: string;
}

export const TeleconsultingHeader: React.FC<TeleconsultingHeaderProps> = ({ activeTabLabel }) => {
  return (
    <section className='flex flex-wrap justify-between items-start gap-4'>
      <div>
        <h1 className="text-2xl mb-2">
          Teleconsulting
          <span className="text-gray-600 text-base font-normal ml-2">
            - Solicitações {activeTabLabel}
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
  );
};