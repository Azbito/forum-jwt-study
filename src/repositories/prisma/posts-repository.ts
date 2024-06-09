import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class PrismaPostsRepository {
    async create(data: Prisma.PostCreateInput) {
        const post = await prisma.post.create({
            data,
        });

        return post;
    }
}
