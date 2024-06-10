import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { compare } from 'bcryptjs';

interface DeleteUserUseCaseRequest {
    email: string;
    password: string;
    passwordVerify: string;
    userID: string;
}

interface DeleteUserUseCaseResponse {
    deletedUser: User;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async deleteAccount({
        email,
        password,
        passwordVerify,
        userID,
    }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await PrismaUsersRepository.findByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        if (user.id !== userID) {
            throw new Error('Unauthorized access');
        }

        const doesHashedPasswordMatch = await compare(
            password,
            user.password_hash,
        );

        if (!doesHashedPasswordMatch) {
            throw new Error('Invalid password');
        }

        if (password !== passwordVerify) {
            throw new Error('Passwords do not match');
        }

        const deleteAllPosts = await this.usersRepository.deleteAllUsersPost(
            user.id,
        );

        if (!deleteAllPosts) {
            throw new Error('User not found or already deleted');
        }

        const deletedUser = await this.usersRepository.deleteById(user.id);

        if (!deletedUser) {
            throw new Error('User not found or already deleted');
        }

        return { deletedUser };
    }
}
