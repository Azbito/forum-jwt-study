import { makeGetUserInfo } from '@/use-case/factories/make-get-user-info';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getCurrentUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const getUserUseCase = makeGetUserInfo();
        const currentUserID = request.user.sub;

        const { user } = await getUserUseCase.getInfosById({
            id: currentUserID,
            username: '',
        });

        return reply.status(200).send(user);
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
