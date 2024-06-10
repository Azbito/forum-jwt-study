import { Post } from '@prisma/client';
import { PrismaPostsRepository } from '@/repositories/prisma/posts-repository';
import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';

interface DeletePostRequest {
    postID: string;
    userID: string;
}

interface DeletePostResponse {
    deletedPost: Post;
}

export class DeletePost {
    constructor(
        private postsRepository: PrismaPostsRepository,
        private userRepository: PrismaUsersRepository,
    ) {}

    async deletePost(
        postRequest: DeletePostRequest,
    ): Promise<DeletePostResponse> {
        const { postID, userID } = postRequest;
        const user = await this.userRepository.findById(userID);

        if (!user) {
            throw new Error('🔍 User not found');
        }

        if (user.id !== userID) {
            throw new Error('🚧 Unauthorized access');
        }

        const deletedPost = await this.postsRepository.delete(postID, userID);

        return { deletedPost };
    }
}
