import fastify from 'fastify';

const app = fastify();

app.get('/', async (request, reply) => {
  reply.send('Hello World!')
});

app.listen({
    port: 3000
}).then(function () {
    console.log('Server is running on port 3000')
})