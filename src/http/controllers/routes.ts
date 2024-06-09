import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { posts } from '@/http/controllers/posts';
import { authenticate } from '@/http/controllers/auth';

export async function appRoutes(app: FastifyInstance) {
    app.post('/register', register);
    app.post('/posts', posts);
    app.post('/login', authenticate);
}
