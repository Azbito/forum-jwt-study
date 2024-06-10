import { Post } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';

interface GetPostsRequest {
    email: string;
    page: number;
}

interface GetPostsResponse {
    getPosts: Post[];
}

export class GetPostsUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async getUserPosts(
        postRequest: GetPostsRequest,
    ): Promise<GetPostsResponse> {
        const { email, page } = postRequest;

        try {
            const getPosts = await this.postsRepository.findManyPostsByEmail(
                email,
                page,
            );

            return { getPosts };
        } catch (error) {
            throw new Error('Failed to fetch posts');
        }
    }
}
