import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';
import { PostUseCase } from '../post';

export function makePostsUseCase() {
    const prismaPostsRepository = new PrismaPostsRepository();
    const postUseCase = new PostUseCase(prismaPostsRepository);

    return postUseCase;
}
