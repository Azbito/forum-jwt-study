import { env } from '@/env';
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: env.ACCESS_KEY_S3,
        secretAccessKey: env.SECRET_KEY_S3,
    },
    region: env.BUCKET_REGION,
});
