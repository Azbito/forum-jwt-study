import { makeDeletePostUseCase } from '@/use-case/factories/make-delete-post';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    const deletePostBodySchema = z.object({
        postID: z.string(),
    });

    try {
        if (!request.user || !request.user.sub) {
            throw new Error('Unauthorized access');
        }

        const { postID } = deletePostBodySchema.parse(request.body);

        const deletePostUseCase = makeDeletePostUseCase();
        const currentUserID = request.user.sub;

        if (!currentUserID)
            return reply.status(404).send({ message: '🤔 User not found' });

        await deletePostUseCase.deletePost({ postID, userID: currentUserID });

        return reply
            .status(200)
            .send({ message: '🗑️ Post deleted successfully' });
    } catch (error: any) {
        return reply
            .status(400)
            .send({ message: error.message || 'Bad request' });
    }
}
