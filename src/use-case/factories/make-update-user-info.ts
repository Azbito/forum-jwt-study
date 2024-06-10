import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { UpdateUserInfo } from '../update-user-info';

export function makeUpdateUserInfoUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserInfo = new UpdateUserInfo(prismaUsersRepository);

    return updateUserInfo;
}
