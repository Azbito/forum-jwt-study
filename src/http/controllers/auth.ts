import { makeAuthenticateUserCase } from '@/use-case/factories/make-auth';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        username: z.string(),
        password: z.string().min(6),
    });

    const { username, password } = authenticateBodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUserCase();

    const { user } = await authenticateUseCase.execute({
        username,
        password,
    });

    const payload = { sub: user.id };
    const accessToken = await reply.jwtSign(payload);
    return reply.status(200).send({ accessToken });
}
