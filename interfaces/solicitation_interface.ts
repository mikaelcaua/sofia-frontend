export interface SolicitationInterface {
  id: string;
  status: 'Avaliada' | 'Aguarda avaliação' | 'Devolvida' | 'Cancelada' | 'Enviada' | 'Rascunho';
  solicitation: string;
  response: string;
  respondedAt: string;
  updatedAt: string;
}
