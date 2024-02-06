import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";


export default async function transactionsRoutes (app: FastifyInstance) {
  
  const prisma = new PrismaClient();

  interface TransactionData {
  name: string;
  amount: number;
  }

  interface RequestParams {
    id: String; 
  }
    
    //Rota - Criar transações
    app.post('/', async (req, reply) => {
      const { name, amount } = req.body as TransactionData;

       try {
        const transaction = await prisma.transactions.create({
          data: {
              name,
              amount,
          }
        })
        reply.code(201).send(transaction);

       } catch (error) {
        console.error('Erro ao criar transação:', error);
        reply.code(500).send();
       }
      });

    //Seção de transações - Listar todas transações
    app.get('/', async () => {
      const transaction = await prisma.transactions.findMany();

      return {
        transaction,
      }
      });

    //Seção de transações - Listar todas transações por ID
    app.get('/:id', async (req) => {
      const params = req.params as RequestParams;
      const transaction = await prisma.transactions.findUnique({
        where: {
          id: String(params.id),
        }
      });

      return {
        transaction
      }
    });


    //Seção de transações - Atualizar transações
    app.put('/', async () => {
        
      });

    //Seção de transações - Atualizar transações - Parcialmente
    app.patch('/', async () => {
        
      });

    //Seção de transações - Deletar transações
    app.delete('/', async () => {
        
    });
}
