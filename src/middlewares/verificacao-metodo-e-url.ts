import { FastifyRequest, FastifyReply } from 'fastify'

export async function verificarMetodoeUrl (request: FastifyRequest, reply: FastifyReply) {
    console.log(`[${request.method}] ${request.url}`)
  }