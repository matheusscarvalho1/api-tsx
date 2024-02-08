import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import { verificarMetodoeUrl } from "../middlewares/verificacao-metodo-e-url";
import { z } from 'zod'



export default async function transactionsRoutes (app: FastifyInstance) {

  app.addHook('preHandler', verificarMetodoeUrl )
  
  const prisma = new PrismaClient();

  interface TransactionData {
  name: string;
  amount: number;
  }

  interface RequestParams {
    id?: String; 
  }
    
    //Rota - Criar transações
    app.post('/add', async (req, reply) => {

      const createTransactionBodySchema = z.object({
        name: z.string(),
        amount: z.number(),
      });

      const { name, amount } = createTransactionBodySchema.parse(req.body) as TransactionData;

       try {
        const newTransaction = await prisma.transactions.create({
          data: {
              name,
              amount,
          }
        })
        reply.code(201).send(newTransaction);

       } catch (error) {
        console.error('Erro ao criar transação:', error);
        reply.code(500).send();
       }
      });


    //Seção de transações - Listar todas transações por ID
    app.get('/:id?', async (req, reply) => {
      const { id } = req.params as RequestParams;

      try {
        if (id) {
          const listTransactionById = await prisma.transactions.findMany({
            where: {
              id: String(id),
            }
          });
          reply.code(200).send(listTransactionById);
        } else {
          const listTransactions = await prisma.transactions.findMany();
          reply.code(200).send(listTransactions);
        }
      }
      catch (error) {
        console.error('Erro ao listar transações:', error);
        reply.code(500).send();
      }
    });

    //Seção de transações - Atualizar transações
    app.put('/:id', async (req, reply) => {
        const { name, amount } = req.body as TransactionData;
        const params = req.params as RequestParams;

        try {
          const updateTransaction = await prisma.transactions.update({
            where: {
              id: String(params.id),
            },
            data: {
              name,
              amount,
            }
          })
          reply.code(200).send(updateTransaction);
        } catch (error) {
          console.error('Erro ao atualizar transação:', error);
          reply.code(500).send();
        } 
      });

    //Seção de transações - Atualizar transações - Parcialmente
    app.patch('/:id', async (req,reply) => {
      const { amount } = req.body as TransactionData;
      const params = req.params as RequestParams;
    
      try {
        const updateTransactionUnique = await prisma.transactions.updateMany({
          where: {
            id: String(params.id),
          },
          data: {
            name: 'Nova transação',
            amount,
          }
        });
        reply.send(200).send(updateTransactionUnique)
      } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        reply.code(500).send();
      }
    })

    //Seção de transações - Deletar transações
    app.delete('/:id', async (req, reply) => {
      const params = req.params as RequestParams;
      try {
        await prisma.transactions.delete({
          where: {
            id: String(params.id),
          }
        })
        reply.code(200).send('Transação apagada!')
      } catch (error) {
        console.error('Erro ao deletar transação:', error);
        reply.code(500).send();
      }
        
    });
}
