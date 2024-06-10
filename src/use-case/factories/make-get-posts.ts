import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';
import { GetPostsUseCase } from '@/use-case/get-posts';

export function makeGetPostsUseCase() {
    const prismaPostsRepository = new PrismaPostsRepository();
    const postUseCase = new GetPostsUseCase(prismaPostsRepository);

    return postUseCase;
}
