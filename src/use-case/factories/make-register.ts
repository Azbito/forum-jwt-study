import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { RegisterUseCase } from '@/use-case/register';

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    return registerUseCase;
}
