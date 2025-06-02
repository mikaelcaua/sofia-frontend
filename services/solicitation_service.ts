import { SolicitationInterface } from '@/interfaces/solicitation_interface';

export class SolicitationService {
  async getSolicitationsByUserId(id: string): Promise<SolicitationInterface[]> {
    return [
      {
        id: id,
        status: 'Devolvida',
        solicitation: 'Exemplo de solicitação',
        response: '',
        respondedAt: '',
        updatedAt: '',
      },
    ];
  }
}
