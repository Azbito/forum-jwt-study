import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { AuthenticateUseCase } from '@/use-case/auth';

export function makeAuthenticateUserCase() {
    const prismaUsersReposity = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersReposity);

    return authenticateUseCase;
}
