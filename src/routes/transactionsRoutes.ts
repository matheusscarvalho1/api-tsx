import { FastifyInstance } from "fastify";



export default async function transactionsRoutes (app: FastifyInstance) {
    
    app.get('/', async () => {
        return'Seção de transações - Listar todas transações'
      });

    app.get('/:id', async () => {
        return'Seção de transações - Listar todas transações por ID'
      });

    app.post('/', async () => {
        return'Seção de transações - Criar transações'
      });

    app.put('/', async () => {
        return'Seção de transações - Atualizar transações - Totalmente'
      });

    app.patch('/', async () => {
        return'Seção de transações - Atualizar transações - Parcialmente'
      });

    app.delete('/', async () => {
        return'Seção de transações - Deletar transações'
    });
}
