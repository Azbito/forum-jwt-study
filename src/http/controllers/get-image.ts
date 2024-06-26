import { makeImageUseCase } from '@/use-case/factories/make-image';
import { FastifyRequest, FastifyReply } from 'fastify';

const fileDownloader = makeImageUseCase();

export async function downloadImage(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        await fileDownloader.download(request, reply);
    } catch (error) {
        console.error('Error handling file upload:', error);
        reply
            .status(500)
            .send({ success: false, error: 'Internal Server Error' });
    }
}
