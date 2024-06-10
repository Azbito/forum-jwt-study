import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class PrismaPostsRepository {
    async create(data: Prisma.PostUncheckedCreateInput) {
        const post = await prisma.post.create({
            data,
        });

        return post;
    }

    async delete(postID: string, userID: string) {
        const post = await prisma.post.delete({
            where: {
                id: postID,
            },
        });

        return post;
    }
}
