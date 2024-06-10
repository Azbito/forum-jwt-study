import { Post } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';

interface DeletePostRequest {
    postID: string;
    userID: string;
}

interface DeletePostResponse {
    deletedPost: Post;
}

export class DeletePost {
    constructor(private postsRepository: PrismaPostsRepository) {}

    async deletePost(
        postRequest: DeletePostRequest,
    ): Promise<DeletePostResponse> {
        const { postID, userID } = postRequest;

        const deletedPost = await this.postsRepository.delete(postID, userID);

        return { deletedPost };
    }
}
