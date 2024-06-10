import { makeRegisterUseCase } from '@/use-case/factories/make-register';
import { makeUpdateUserInfoUseCase } from '@/use-case/factories/make-update-user-info';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateUserInfo(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const updateUserInfoBodySchema = z.object({
        name: z.string().optional(),
        oldEmail: z.string().email(),
        newEmail: z.string().email().optional(),
        username: z.string().min(2).optional(),
        oldPassword: z.string(),
        password: z.string().min(6),
        passwordVerify: z.string(),
    });

    const {
        name,
        username,
        oldEmail,
        newEmail,
        oldPassword,
        password,
        passwordVerify,
    } = updateUserInfoBodySchema.parse(request.body);

    try {
        const updateUserInfoUseCase = makeUpdateUserInfoUseCase();

        const currentUserID = request.user.sub;

        if (!currentUserID)
            return reply.status(404).send({ message: '🤔 User not found' });

        const user = await updateUserInfoUseCase.updateInfo({
            name,
            username,
            oldEmail,
            newEmail,
            oldPassword,
            password,
            passwordVerify,
            currentUserID,
        });

        return reply.status(200).send({ user });
    } catch (err) {
        throw err;
    }
}
