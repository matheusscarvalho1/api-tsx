import fastify from 'fastify';
import transactionsRoutes from './routes/transactionsRoutes';

const app = fastify();

app.get('/', async () => {
    return 'Hello World - Rotas definidas: /transactions'
});

app.register(transactionsRoutes, { 
    prefix: '/transactions' 
})


app.listen({
    port: 3000
}).then(function () {
    console.log('Server is running on port 3000')
})