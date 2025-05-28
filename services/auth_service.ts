import UserInteface from "@/interfaces/user_interface";

export default class AuthService {
  
  public login(username: string, password: string): UserInteface {
    return {
        email:'',
        id:0,
        name:'',
        roles: [
            {
              id: 1,
              name: 'Solicitante',
              status: 'SIM',
              description: 'Solicitante'
            }
          ],
        requests:[
          { id: '107387', status: 'Avaliada', solicitacao: 'Quais os riscos de...', resposta: 'O Brasil tem dois c...', respondidaEm: '10/01/2025', atualizadaEm: '10/01/2025' },
          { id: '123456', status: 'Aguarda avaliação', solicitacao: 'Covid e hipertensão', resposta: 'O Brasil tem dois c...', respondidaEm: '10/01/2025', atualizadaEm: '10/01/2025' },
          { id: '100001', status: 'Avaliada', solicitacao: 'Vacinação em crianças', resposta: 'É fundamental seguir...', respondidaEm: '15/01/2025', atualizadaEm: '15/01/2025' },
          { id: '100002', status: 'Devolvida', solicitacao: 'Erro no preenchimento', resposta: 'Por favor, revise os dados.', respondidaEm: '18/01/2025', atualizadaEm: '18/01/2025' },
          { id: '100003', status: 'Enviada', solicitacao: 'Dúvida sobre medicação', resposta: '', respondidaEm: '', atualizadaEm: '20/01/2025' },
          { id: '100004', status: 'Rascunho', solicitacao: 'Iniciar solicitação de...', resposta: '', respondidaEm: '', atualizadaEm: '22/01/2025' },
        ]
    }
  }

  public logout(): void {
    
  }
}