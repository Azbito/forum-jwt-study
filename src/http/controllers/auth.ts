import { makeAuthenticateUserCase } from '@/use-case/factories/make-auth';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUserCase();

        const { user } = await authenticateUseCase.execute({ email, password });
        if (user) {
            const payload = { sub: user.id };
            const accessToken = await reply.jwtSign(payload);
            return reply.status(200).send({ accessToken });
        } else {
            return reply
                .status(401)
                .send({ message: '❌ Invalid credentials' });
        }
    } catch (err) {
        return reply.status(500).send({ message: '🚧 Internal server error' });
    }
}
