import { FileUploader } from '@/use-case/upload-image';
import { FastifyRequest, FastifyReply } from 'fastify';

const fileUploader = new FileUploader();

export async function uploadImage(request: FastifyRequest, reply: FastifyReply) {
    try {
        await fileUploader.uploadFile(request, reply);
    } catch (error) {
        console.error('Error handling file upload:', error);
        reply.status(500).send({ success: false, error: 'Internal Server Error' });
    }
}
