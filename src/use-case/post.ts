import { Post, User } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';

interface PostUseCaseRequest {
    title: string;
    description: string;
}

interface PostUseCaseResponse {
    post: Post;
}

export class PostUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async execute(
        postRequest: PostUseCaseRequest,
        user: User,
    ): Promise<PostUseCaseResponse> {
        const { title, description } = postRequest;

        const post = await this.postsRepository.create({
            title,
            description,
            user: { connect: { email: user.email } },
        });

        return { post };
    }
}
