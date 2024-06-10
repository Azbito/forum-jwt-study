import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

export class PrismaUsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });

        return user;
    }

    static async findByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
        });
    }

    async deleteById(userId: string): Promise<User | null> {
        return prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }

    async deleteAllUsersPost(userId: string) {
        return prisma.post.deleteMany({
            where: {
                userId: userId,
            },
        });
    }

    // async insertToken(token: string | null, email: string) {
    //     return await prisma.user.update({
    //         where: { email },
    //         data: { jwt_token: token },
    //     });
    // }
}
