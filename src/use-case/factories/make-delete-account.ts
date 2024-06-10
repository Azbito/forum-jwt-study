import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { RegisterUseCase } from '@/use-case/register';
import { DeleteUserUseCase } from '../remove-account';

export function makeDeleteAccountUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteAccountUseCase = new DeleteUserUseCase(prismaUsersRepository);

    return deleteAccountUseCase;
}
