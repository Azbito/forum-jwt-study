import { Post } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';

interface PostUseCaseRequest {
    description: string;
    userId: string;
}

interface PostUseCaseResponse {
    post: Post;
}

export class PostUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async execute(
        postRequest: PostUseCaseRequest,
    ): Promise<PostUseCaseResponse> {
        const { description, userId } = postRequest;

        const post = await this.postsRepository.create({
            description,
            userId,
        });

        return { post };
    }
}
