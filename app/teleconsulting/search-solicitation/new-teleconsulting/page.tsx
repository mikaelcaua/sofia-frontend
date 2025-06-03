'use client'
import BrButtonCustomize from "@/components/br_button_customize";
import { BrSelect, BrSwitch, BrTextarea, BrUpload } from "@govbr-ds/webcomponents-react";
import { useState } from "react";

export default function NewSolicitationScreen() {
  const [pacientIsSpecific, setPacientIsSpecific] = useState(false);

  return (
    <main className="min-h-screen p-6 flex flex-col gap-3">

      <h1 className="text-2xl mb-2">Nova Solicitação</h1>

      <div className="flex gap-16">

        <BrSwitch
          label="Sobre um Paciente Específico?"
          labelOn="Sim"
          labelOff="Não"
          checked={pacientIsSpecific}
          onChange={(event: any) => {
            const target = event.target as HTMLInputElement;
            setPacientIsSpecific(target.checked);
          }}
        />

        <BrSwitch
          label="Há Intenção de Encaminhamento?"
          labelOn="Sim"
          labelOff="Não"
          checked={pacientIsSpecific}
          onChange={(event: any) => {
            const target = event.target as HTMLInputElement;
            setPacientIsSpecific(target.checked);
          }}
        />

        <BrSwitch
          label="Encaminhamento já Solicitado?"
          labelOn="Sim"
          labelOff="Não"
          checked={pacientIsSpecific}
          onChange={(event: any) => {
            const target = event.target as HTMLInputElement;
            setPacientIsSpecific(target.checked);
          }}
        />

      </div>

      <BrSelect
        showSearchIcon
        placeholder="Digite aqui a especialidade que procura"
        options={[{
          value: "acre",
          label: "Acre",
          selected: false
        }]} 
      />

      <BrTextarea
        placeholder="Insira a descrição da solicitação"
        label="Descrição da Solicitação"
      />

      <section className="flex gap-12">
        <BrUpload
          label="Envio de arquivos"
          multiple={true}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="w-[32rem]"
        />

        <div className="flex justify-start items-center gap-3">
          <BrButtonCustomize emphasis="secondary" className="h-10">Salvar Rascunho</BrButtonCustomize>
          <BrButtonCustomize emphasis="primary" className="h-10">Enviar Solicitação</BrButtonCustomize>
        </div>

      </section>
    </main>
  );
}