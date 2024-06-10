import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

interface UserData {
    name?: string;
    username?: string;
    oldEmail?: string;
    password?: string;
    currentUserID: string;
}

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

    async findByUsername(username: string) {
        return await prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async updateInfo({
        oldEmail,
        username,
        name,
        password,
        currentUserID,
    }: UserData) {
        return await prisma.user.update({
            where: { id: currentUserID },
            data: { email: oldEmail, username, name, password_hash: password },
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

    async fetchProfilePicture(url: string, userID: string) {
        return prisma.user.findMany({
            where: {
                id: userID,
                profile_picture: url,
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
