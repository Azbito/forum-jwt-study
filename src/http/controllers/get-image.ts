import { s3Client } from '@/bucket';
import { env } from '@/env';
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function getImages(request: FastifyRequest, reply: FastifyReply) {
    try {
        const command = new GetObjectCommand({
            Bucket: env.BUCKET_NAME,
            Key: 'jiji-photo-u3.png',
        });
        // Generate a presigned URL for the image
        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 99999,
        });

        reply.status(200).send({ url: signedUrl });
    } catch (err) {
        console.error('Error generating presigned URL:', err);
        reply.status(500).send({ error: 'Internal Server Error' });
    }
}
