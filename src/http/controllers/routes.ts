import { FastifyInstance } from 'fastify';
import { register } from './register';
import { posts } from './posts';

export async function appRoutes(app: FastifyInstance) {
    app.post('/register', register);
    app.post('/posts', posts);
}
