import { makeRegisterUseCase } from '@/use-case/factories/make-register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
        passwordVerify: z.string(),
    });

    const { name, email, password, passwordVerify } = registerBodySchema.parse(
        request.body,
    );

    try {
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            name,
            email,
            password,
            passwordVerify,
        });
    } catch (err) {
        throw err;
    }

    return reply.status(200).send();
}
