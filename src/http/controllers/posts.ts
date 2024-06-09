import { makePostsUseCase } from '@/use-case/factories/make-post';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { verify } from 'jsonwebtoken';
import { env } from '@/env';
import { prisma } from '@/lib/prisma';

export async function posts(request: FastifyRequest, reply: FastifyReply) {
    const postsBodySchema = z.object({
        title: z.string(),
        description: z.string(),
    });

    const token = request.cookies.jwt_token;
    if (!token)
        return reply.status(401).send({ message: '⚠️ Access token missing' });

    const user = await prisma.user.findUnique({
        where: {
            jwt_token: token
        }
    });

    if (!user) return reply.status(404).send({ message: '🤔 User not found' });

    const { title, description } = postsBodySchema.parse(request.body);

    const dbToken = user.jwt_token;

    if (token !== dbToken) {
        return reply.status(403).send({ message: '❌ Unauthorized!' });
    }

    const postsUseCase = makePostsUseCase();
    await postsUseCase.execute({ title, description }, user);

    return reply.status(200).send();
}