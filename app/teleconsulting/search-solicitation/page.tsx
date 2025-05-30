'use client'
import {BrTextarea } from '@govbr-ds/webcomponents-react';
import BrButtonCustomize from '@/components/br_button_customize';

const SearchSolicitationScreen = () => {
 
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl mb-2">
        Pergunte à SOFIA
      </h1>
      <div className="flex flex-col gap-4 px-2">

        <p>
          Olá, Solicitante!
        </p>
        <p>
          Antes de prosseguir com a sua solicitação, verifique se na SOFIA já existe uma resposta para o questionamento que você procura.
        </p>

        <section className='flex w-full justify-between'>
          <div className=' w-full flex flex-col' >

            <p>
              Por favor, descreva sua pergunta:
            </p>
            <div className='flex w-full justify-between gap-4'>
              <BrTextarea className='w-full' placeholder='Descreva sua pergunta' />
              <div className='flex pb-2'>
                <BrButtonCustomize emphasis='primary' className='max-h-12 self-end'>Pesquisar</BrButtonCustomize>
              </div>

            </div>

          </div>


        </section>


      </div>
    </main>
  );
};

export default SearchSolicitationScreen;