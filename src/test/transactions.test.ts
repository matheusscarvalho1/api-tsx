import { test, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../app";

describe("Testes de transações", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("O usuário deve conseguir criar uma nova transação", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        name: "New transaction",
        amount: 5000,
      })
      .expect(201);
  });

  test("O usuário deve listar todas as transações", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        name: "New transaction",
        amount: 5000,
      });

    // const cookies = createTransactionResponse.get('Set-Cookie')
    // const listTransactionsResponse = await request(app.server)

    // .get('/transactions')
    // .set('Cookie', cookies)
    // .expect(200)

    // expect(listTransactionsResponse.body.transactions).toEqual([
    //     expect.objectContaining({
    //         title: 'New transaction',
    //         amount: 5000,
    //    })
    // ]);
  });
});
