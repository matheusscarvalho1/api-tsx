import { test, beforeAll, afterAll } from 'vitest'
import request  from 'supertest'
import { app } from '../app'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

test('O usuário consegue criar uma nova transação', async () => {
     await request(app.server)
    .post('/transactions')
    .send({
        name: 'New transaction',
        amount: 5000,
    })
    .expect(201)
})