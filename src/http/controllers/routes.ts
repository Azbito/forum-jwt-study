import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { post } from '@/http/controllers/post';
import { authenticate } from '@/http/controllers/auth';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { deleteAccount } from '@/http/controllers/delete-account';
import { deletePost } from '@/http/controllers/delete-post';
import { getPosts } from './get-posts';
import { downloadImage } from './get-image';
import { uploadImage } from './upload-profile-picture';
import { updateUserInfo } from './update-user-info';

export async function appRoutes(app: FastifyInstance) {
    // GET

    app.get(
        '/users/:username/get-posts',
        {
            onRequest: [verifyJWT],
        },
        getPosts,
    );

    app.get(
        '/get-image',
        {
            onRequest: [verifyJWT],
        },
        downloadImage,
    );

    // POST

    app.post('/register', register);
    app.post(
        '/post',
        {
            onRequest: [verifyJWT],
        },
        post,
    );
    app.post('/login', authenticate);
    app.post('/upload-image', uploadImage);
    app.post(
        '/update-user-credential',
        {
            onRequest: [verifyJWT],
        },
        updateUserInfo,
    );

    // DELETE

    app.delete(
        '/remove-user',
        {
            onRequest: [verifyJWT],
        },
        deleteAccount,
    );
    app.delete(
        '/remove-post',
        {
            onRequest: [verifyJWT],
        },
        deletePost,
    );
}
