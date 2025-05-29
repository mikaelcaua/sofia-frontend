import { UserInteface } from "@/interfaces/user_interface";

export default class AuthService {

  public login(username: string, password: string): UserInteface {
    return {
      email: '',
      id: 0,
      name: '',
      roles: [
        {
          id: 1,
          name: 'Solicitante',
          status: 'SIM',
          description: 'Solicitante'
        }
      ],
      solicitations: [
        { id: '107387', status: 'Avaliada', solicitation: 'Quais os riscos de...', response: 'O Brasil tem dois c...', respondedAt: '10/01/2025', updatedAt: '10/01/2025' },
        { id: '123456', status: 'Aguarda avaliação', solicitation: 'Covid e hipertensão', response: 'O Brasil tem dois c...', respondedAt: '10/01/2025', updatedAt: '10/01/2025' },
        { id: '100001', status: 'Avaliada', solicitation: 'Vacinação em crianças', response: 'É fundamental seguir...', respondedAt: '15/01/2025', updatedAt: '15/01/2025' },
        { id: '100002', status: 'Devolvida', solicitation: 'Erro no preenchimento', response: 'Por favor, revise os dados.', respondedAt: '18/01/2025', updatedAt: '18/01/2025' },
        { id: '100003', status: 'Enviada', solicitation: 'Dúvida sobre medicação', response: '', respondedAt: '', updatedAt: '20/01/2025' },
        { id: '100004', status: 'Rascunho', solicitation: 'Iniciar solicitação de...', response: '', respondedAt: '', updatedAt: '22/01/2025' },
      ]
    }
  }

  public logout(): void {

  }
}