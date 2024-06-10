import { makeGetPostsUseCase } from '@/use-case/factories/make-get-posts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function getPosts(request: FastifyRequest, reply: FastifyReply) {
    const getPostsSchema = z.object({
        params: z.object({
            email: z.string().email(),
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

        const { email } = validationResult.data.params;
        let { page } = validationResult.data.query;

        // Set a default value for page if it's not provided or empty
        if (!page) {
            page = '1';
        }

        const getUserPostsUseCase = makeGetPostsUseCase();

        const { getPosts } = await getUserPostsUseCase.getUserPosts({
            email,
            page: Number(page),
        });

        return reply.status(200).send({ posts: getPosts });
    } catch (error: any) {
        console.error('Error in getPosts:', error);
        return reply.status(500).send({ message: 'Internal Server Error' });
    }
}
