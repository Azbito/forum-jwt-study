import { makeRegisterUseCase } from '@/use-case/factories/make-register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        username: z.string().min(2),
        password: z.string().min(6),
        passwordVerify: z.string(),
    });

    const { name, username, email, password, passwordVerify } =
        registerBodySchema.parse(request.body);

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            name,
            email,
            username,
            password,
            passwordVerify,
        });
    } catch (err) {
        throw err;
    }

    return reply.status(200).send();
}
