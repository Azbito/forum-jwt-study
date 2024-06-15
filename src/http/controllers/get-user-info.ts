import { makeGetPostsUseCase } from '@/use-case/factories/make-get-posts';
import { makeGetUserInfo } from '@/use-case/factories/make-get-user-info';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getUserInfo(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const getUserInfoSchema = z.object({
        params: z.object({
            id: z.string(),
        }),
    });

    try {
        const { params } = getUserInfoSchema.parse(request);

        const getUserUseCase = makeGetUserInfo();

        const { user } = await getUserUseCase.getInfos({
            id: params.id,
        });
        return reply.status(200).send({ user });
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
