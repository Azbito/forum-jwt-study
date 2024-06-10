import { makeDeleteAccountUseCase } from '@/use-case/factories/make-delete-account';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deleteAccount(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const deleteAccountBodySchema = z.object({
        email: z.string(),
        password: z.string(),
        passwordVerify: z.string(),
    });

    try {
        if (!request.user || !request.user.sub) {
            throw new Error('❌ Unauthorized access');
        }

        const { email, password, passwordVerify } =
            deleteAccountBodySchema.parse(request.body);

        const deleteAccountUseCase = makeDeleteAccountUseCase();
        const currentUserID = request.user.sub;

        await deleteAccountUseCase.deleteAccount({
            email,
            password,
            passwordVerify,
            userID: currentUserID,
        });

        return reply
            .status(200)
            .send({ message: '🪦 Account deleted successfully' });
    } catch (error: any) {
        return reply
            .status(400)
            .send({ message: error.message || 'Bad request' });
    }
}
