import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { InvalidCredentialsError, MissingCredentialsError } from '@/errors';

interface AuthenticateUseCaseRequest {
    email?: string;
    username?: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user: User;
}

export class AuthenticateUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async execute({
        email,
        username,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        if (!email && !username) {
            throw new MissingCredentialsError();
        }

        let user: User | null = null;

        if (email) {
            user = await PrismaUsersRepository.findByEmail(email);
        }

        if (!user && username) {
            user = await this.usersRepository.findByUsername(username);
        }

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doPasswordsMatch = await compare(password, user.password_hash);

        if (!doPasswordsMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
