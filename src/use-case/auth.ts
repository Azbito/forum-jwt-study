import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';

interface AuthenticateUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticateUseCaseResponse {
    user?: User;
}

export class AuthenticateUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await PrismaUsersRepository.findByEmail(email);

        if (!user) {
            throw new Error('🚧 Invalid credentials');
        }

        const doPasswordsMatch = await compare(password, user.password_hash);

        if (!doPasswordsMatch) {
            throw new Error('🚧 Invalid credentials');
        }

        return { user };
    }
}
