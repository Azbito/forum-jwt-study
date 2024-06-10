import { UserImage } from '../profile-picture';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';

export function makeImageUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const postUseCase = new UserImage(usersRepository);

    return postUseCase;
}
