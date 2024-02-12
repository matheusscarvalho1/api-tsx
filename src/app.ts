import transactionsRoutes from './routes/transactionsRoutes';
import fastify from 'fastify';


export const app = fastify();


app.get('/', async () => {
    return 'Hello World - Rotas definidas: /transactions'
});


app.register(transactionsRoutes, { 
    prefix: '/transactions' 
})