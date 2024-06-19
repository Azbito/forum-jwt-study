import { makeGetPostsUseCase } from '@/use-case/factories/make-get-posts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const getPostsSchema = z.object({
        params: z.object({
            identifier: z.string(),
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

        const { identifier } = validationResult.data.params;
        let { page } = validationResult.data.query;

        if (!page) {
            page = '1';
        }

        const getUserPostsUseCase = makeGetPostsUseCase();
        let getPosts;

        if (isNaN(Number(identifier))) {
            // Assuming identifier is a username
            const result = await getUserPostsUseCase.getUserPosts({
                username: identifier,
                page: Number(page),
            });
            getPosts = result.getPosts;
        } else {
            // Assuming identifier is a user ID
            const result = await getUserPostsUseCase.getUserPostsById({
                id: identifier,
                page: Number(page),
            });
            getPosts = result.getPosts;
        }

        return reply.status(200).send({ posts: getPosts });
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
