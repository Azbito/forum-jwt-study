import { generateJWT } from '@/@utils/generateJWT';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
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
        const userRepository = new PrismaUsersRepository();

        const user = await authenticateUseCase.execute({ email, password });

        if (user) {
            const accessToken = generateJWT(email);

            await userRepository.insertToken(accessToken, email);

            reply.setCookie('jwt_token', accessToken, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            return reply.status(200).send({ accessToken });
        } else {
            return reply.status(401).send({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error('Erro durante a autenticação:', err);
        return reply.status(500).send({ message: 'Erro interno do servidor' });
    }
}
