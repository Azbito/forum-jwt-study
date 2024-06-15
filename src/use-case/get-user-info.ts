import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { InvalidCredentialsError, MissingCredentialsError } from '@/errors';

interface GetUserInfoUseCaseRequest {
    username: string;
}

interface GetUserInfoUseCaseResponse {
    user: User;
}

export class GetUserInfoUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async getInfos(
        userRequest: GetUserInfoUseCaseRequest,
    ): Promise<GetUserInfoUseCaseResponse> {
        const { username } = userRequest;

        try {
            const user = await this.usersRepository.findByUsername(username);

            if (!user) {
                throw new InvalidCredentialsError('User not found');
            }

            return { user };
        } catch (error) {
            throw new Error('Failed to fetch user information');
        }
    }
}
