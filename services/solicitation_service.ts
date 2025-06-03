import { SolicitationInterface } from '@/interfaces/solicitation_interface';

export class SolicitationService {
  async getSolicitationsByUserId(id: string): Promise<SolicitationInterface[]> {
    return [
      {
        id: id,
        status: 'Devolvida',
        solicitation: 'solicitacao por id',
        response: '',
        respondedAt: '',
        updatedAt: '',
      },
    ];
  }

  async getSolicitationsWithWords(id: string): Promise<SolicitationInterface[]> {
    return [
      {
        id: id,
        status: 'Devolvida',
        solicitation: 'Solicitacao com palavras chaves',
        response: '',
        respondedAt: '',
        updatedAt: '',
      },
    ];
  }
}
