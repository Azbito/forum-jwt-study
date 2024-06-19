import { makeGetUserInfo } from '@/use-case/factories/make-get-user-info';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getUserInfo(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const getUserInfoSchema = z.object({
        params: z.object({
            idOrUsername: z.string().optional(),
        }),
    });

    try {
        const { params } = getUserInfoSchema.parse(request);
        const getUserUseCase = makeGetUserInfo();

        if (!params.idOrUsername) {
            return reply
                .status(400)
                .send({ message: 'Missing id/username parameter' });
        }

        let user;

        const isUUID =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (isUUID.test(params.idOrUsername)) {
            user = await getUserUseCase.getInfosById({
                id: params.idOrUsername,
                username: '',
            });
        } else {
            user = await getUserUseCase.getInfos({
                username: params.idOrUsername,
                id: '',
            });
        }

        return reply.status(200).send({ user });
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
