import { makePostsUseCase } from '@/use-case/factories/make-post';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function post(request: FastifyRequest, reply: FastifyReply) {
    const postsBodySchema = z.object({
        description: z.string(),
    });

    const currentUserID = request.user.sub;

    if (!currentUserID)
        return reply.status(404).send({ message: '🤔 User not found' });

    const { description } = postsBodySchema.parse(request.body);

    const postsUseCase = makePostsUseCase();
    await postsUseCase.execute({ description, userId: currentUserID });

    return reply.status(200).send();
}
