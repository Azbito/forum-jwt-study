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
                userId: userID,
            },
        });

        return post;
    }

    async findManyPostsByEmail(email: string, page: number) {
        const postsPerPage = 10;
        const skip = (page - 1) * postsPerPage;

        return await prisma.post.findMany({
            where: { user: { email } },
            skip,
            take: postsPerPage,
            orderBy: { created_at: 'desc' },
        });
    }
}
