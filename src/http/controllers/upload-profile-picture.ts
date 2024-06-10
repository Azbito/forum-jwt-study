import { makeImageUseCase } from '@/use-case/factories/make-image';
import { FastifyRequest, FastifyReply } from 'fastify';

const fileUploader = makeImageUseCase();

export async function uploadImage(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        await fileUploader.upload(request, reply);
    } catch (error) {
        console.error('Error handling file upload:', error);
        reply
            .status(500)
            .send({ success: false, error: 'Internal Server Error' });
    }
}
