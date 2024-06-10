import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { posts } from '@/http/controllers/posts';
import { authenticate } from '@/http/controllers/auth';
import { uploadImage } from '@/http/controllers/upload-image';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { deleteAccount } from '@/http/controllers/delete-account';

export async function appRoutes(app: FastifyInstance) {
    app.post('/register', register);
    app.post(
        '/posts',
        {
            onRequest: [verifyJWT],
        },
        posts,
    );
    app.post('/login', authenticate);
    app.post('/upload-image', uploadImage);
    app.delete(
        '/remove-user',
        {
            onRequest: [verifyJWT],
        },
        deleteAccount,
    );
}
