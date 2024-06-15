import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { UpdateUserInfo } from '../update-user-info';
import { GetUserInfoUseCase } from '../get-user-info';

export function makeGetUserInfo() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getUserInfo = new GetUserInfoUseCase(prismaUsersRepository);

    return getUserInfo;
}
