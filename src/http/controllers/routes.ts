import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { post } from '@/http/controllers/post';
import { authenticate } from '@/http/controllers/auth';
import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { deleteAccount } from '@/http/controllers/delete-account';
import { deletePost } from '@/http/controllers/delete-post';
import { downloadImage } from './get-image';
import { uploadImage } from './upload-profile-picture';
import { updateUserInfo } from './update-user-info';
import { getAllPosts } from './get-all-posts';
import { getUserInfo } from './get-user-info';
import { getCurrentUser } from './get-current-user';
import { getPosts } from './get-posts-by-username';

export async function appRoutes(app: FastifyInstance) {
    // GET

    app.get(
        '/user/:identifier/get-posts',
        {
            onRequest: [verifyJWT],
        },
        getPosts,
    );

    app.get('/users/get-posts', getAllPosts);

    app.get(
        '/get-image',
        {
            onRequest: [verifyJWT],
        },
        downloadImage,
    );

    app.get('/user/:idOrUsername', getUserInfo);

    app.get(
        '/user',
        {
            onRequest: [verifyJWT],
        },
        getCurrentUser,
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
