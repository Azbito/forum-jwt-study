import { s3Client } from '@/bucket';
import { env } from '@/env';
import { Upload } from '@aws-sdk/lib-storage';
import { FastifyRequest, FastifyReply } from 'fastify';

interface CustomRequest extends FastifyRequest {
    file: any;
}

export class FileUploader {
    async uploadFile(request: CustomRequest, reply: FastifyReply) {
        try {
            const data = await request.file();

            const params = {
                Bucket: env.BUCKET_NAME,
                Key: data.filename,
                Body: data.file,
                ContentType: data.mimetype,
            };

            const upload = new Upload({
                client: s3Client,
                params,
            });

            const uploadResponse = await upload.done();

            return reply.send({ success: true, data: uploadResponse });
        } catch (error) {
            // data log
        }
    }
}
