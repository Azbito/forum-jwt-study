import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';
import { DeletePost } from '@/use-case/delete-post';

export function makeDeletePostUseCase() {
    const prismaDeletePostRepository = new PrismaPostsRepository();
    const postDeleteUseCase = new DeletePost(prismaDeletePostRepository);

    return postDeleteUseCase;
}
