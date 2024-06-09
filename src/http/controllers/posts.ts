import { FastifyReply, FastifyRequest } from 'fastify';

export async function posts(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send();
}
