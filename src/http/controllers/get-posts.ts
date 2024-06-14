import { makeGetPostsUseCase } from '@/use-case/factories/make-get-posts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const getPostsSchema = z.object({
        params: z.object({
            username: z.string(),
        }),
        query: z.object({
            page: z.string().optional().default('1'),
        }),
    });

    try {
        if (!request.user || !request.user.sub) {
            return reply.status(401).send({ message: 'Unauthorized access' });
        }

        const validationResult = getPostsSchema.safeParse({
            params: request.params,
            query: request.query,
        });

        if (!validationResult.success) {
            return reply.status(400).send({
                message: 'Invalid request parameters',
                issues: validationResult.error.issues,
            });
        }

        const { username } = validationResult.data.params;
        let { page } = validationResult.data.query;

        if (!page) {
            page = '1';
        }

        const getUserPostsUseCase = makeGetPostsUseCase();

        const { getPosts } = await getUserPostsUseCase.getUserPosts({
            username,
            page: Number(page),
        });

        return reply.status(200).send({ posts: getPosts });
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
