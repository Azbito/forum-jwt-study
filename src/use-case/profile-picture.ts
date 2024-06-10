import { s3Client } from '@/bucket';
import { env } from '@/env';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FastifyRequest, FastifyReply } from 'fastify';

interface CustomRequest extends FastifyRequest {
    file: any;
}

export class UserImage {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async upload(request: CustomRequest, reply: FastifyReply) {
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

    async download(request: CustomRequest, reply: FastifyReply) {
        try {
            const command = new GetObjectCommand({
                Bucket: env.BUCKET_NAME,
                Key: 'jiji-photo-u3.png',
            });

            const signedUrl = await getSignedUrl(s3Client, command);
            const currentUserID = request.user.sub;

            await this.usersRepository.fetchProfilePicture(
                currentUserID,
                signedUrl,
            );

            reply.status(200).send({ url: signedUrl });
        } catch (err) {
            console.error('Error generating presigned URL:', err);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}
