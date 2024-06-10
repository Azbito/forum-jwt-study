import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    passwordVerify: string;
}

interface RegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async execute(
        registerRequest: RegisterUseCaseRequest,
    ): Promise<RegisterUseCaseResponse> {
        const { name, username, email, password, passwordVerify } =
            registerRequest;

        if (password !== passwordVerify) {
            throw new Error();
        }

        const password_hash = await hash(password, 5);
        const userWithSameEmail =
            await PrismaUsersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error();
        }

        const user = await this.usersRepository.create({
            name,
            username,
            email,
            password_hash,
        });

        return { user };
    }
}
