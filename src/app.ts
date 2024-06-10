import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from '@/env';
import { appRoutes } from '@/http/controllers/routes';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';

export const app = fastify();
app.register(fastifyMultipart);
app.register(fastifyCors);
app.register(fastifyCookie, {
    secret: env.COOKIE_ACCESS,
});

app.register(fastifyJwt, {
    secret: env.JWT_ACCESS,
    sign: { expiresIn: '7d' },
});

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validate error.', issues: error.format });
    }

    if (env.NODE_ENV != 'prod') {
        console.error(error);
    } else {
        // here we should use data log to store
    }

    return reply.status(500).send({ message: 'Internal server error.' });
});
