import { makeGetPostsUseCase } from '@/use-case/factories/make-get-posts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getAllPosts(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const getPostsSchema = z.object({
        query: z.object({
            page: z.string().optional().default('1'),
        }),
    });

    try {
        const validationResult = getPostsSchema.safeParse({
            query: request.query,
        });

        if (!validationResult.success) {
            return reply.status(400).send({
                message: 'Invalid request parameters',
                issues: validationResult.error.issues,
            });
        }

        let { page } = validationResult.data.query;

        if (!page) {
            page = '1';
        }

        const getUserPostsUseCase = makeGetPostsUseCase();

        const { getPosts } = await getUserPostsUseCase.getAllPosts({
            page: Number(page),
        });

        return reply.status(200).send({ posts: getPosts });
    } catch (error: any) {
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
