import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { DeletePost } from '@/use-case/delete-post';

export function makeDeletePostUseCase() {
    const prismaDeletePostRepository = new PrismaPostsRepository();
    const prismaUsersRepository = new PrismaUsersRepository();
    const postDeleteUseCase = new DeletePost(
        prismaDeletePostRepository,
        prismaUsersRepository,
    );

    return postDeleteUseCase;
}
