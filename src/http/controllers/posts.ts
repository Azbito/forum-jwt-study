import { makePostsUseCase } from '@/use-case/factories/make-post';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function posts(request: FastifyRequest, reply: FastifyReply) {
    const postsBodySchema = z.object({
        title: z.string(),
        description: z.string(),
    });

    const currentUserID = request.user.sub;

    if (!currentUserID)
        return reply.status(404).send({ message: '🤔 User not found' });

    const { title, description } = postsBodySchema.parse(request.body);

    const postsUseCase = makePostsUseCase();
    await postsUseCase.execute({ title, description, userId: currentUserID });

    return reply.status(200).send();
}
