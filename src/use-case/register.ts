import { User } from '@prisma/client';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async execute(
        registerRequest: RegisterUseCaseRequest,
    ): Promise<RegisterUseCaseResponse> {
        const { name, email, password } = registerRequest;
        const password_hash = await hash(password, 5);
        //const userWithSameEmail = await this.usersRepository.findByEmail(email)

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return { user };
    }
}
