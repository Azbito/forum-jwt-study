import { Post } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';

interface GetPostsByUsernameRequest {
    username?: string;
    id?: string;
    page: number;
}

interface GetAllPostsRequest {
    page: number;
}

interface GetPostsResponse {
    getPosts: Post[];
}

export class GetPostsUseCase {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async getUserPosts(
        postRequest: GetPostsByUsernameRequest,
    ): Promise<GetPostsResponse> {
        const { username, page } = postRequest;

        try {
            if (!username) {
                throw new Error('🦠 Failed to fetch posts');
            }

            const getPosts = await this.postsRepository.findManyPostsByUsername(
                username,
                page,
            );

            return { getPosts };
        } catch (error) {
            throw new Error('🦠 Failed to fetch posts');
        }
    }

    async getUserPostsById(
        postRequest: GetPostsByUsernameRequest,
    ): Promise<GetPostsResponse> {
        const { id, page } = postRequest;

        try {
            if (!id) {
                throw new Error('🦠 Failed to fetch posts');
            }

            const getPosts = await this.postsRepository.findManyPostsById(
                id,
                page,
            );

            return { getPosts };
        } catch (error) {
            throw new Error('🦠 Failed to fetch posts');
        }
    }

    async getAllPosts(
        postRequest: GetAllPostsRequest,
    ): Promise<GetPostsResponse> {
        const { page } = postRequest;

        try {
            const getPosts = await this.postsRepository.findManyPosts(page);

            return { getPosts };
        } catch (error) {
            throw new Error('🦠 Failed to fetch posts');
        }
    }
}
