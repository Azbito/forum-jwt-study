import { PrismaUsersRepository } from '@/repositories/prisma/users-repository';
import { compare, hash } from 'bcryptjs';
import { User } from '@prisma/client';
import {
    InternalServerError,
    InvalidCredentialsError,
    PasswordsDoNotMatchError,
    UnauthorizedAccessError,
    UserInfoAlreadyExistError,
    UserNotFoundError,
} from '@/errors';

interface UpdateUserInfoRequest {
    name?: string;
    oldEmail: string;
    newEmail?: string;
    username?: string;
    oldPassword: string;
    password: string;
    passwordVerify: string;
    currentUserID: string;
}

interface UpdateUserInfoResponse {
    user?: User;
    error?: string;
}

export class UpdateUserInfo {
    constructor(private usersRepository: PrismaUsersRepository) {}

    async updateInfo({
        name,
        oldEmail,
        newEmail,
        username,
        oldPassword,
        password,
        passwordVerify,
        currentUserID,
    }: UpdateUserInfoRequest): Promise<UpdateUserInfoResponse> {
        try {
            if (password !== passwordVerify) {
                throw new PasswordsDoNotMatchError();
            }

            if (!oldEmail) {
                throw new InvalidCredentialsError();
            }

            let user: User | null =
                await PrismaUsersRepository.findByEmail(oldEmail);

            if (!user) {
                throw new UserNotFoundError();
            }

            if (user.id !== currentUserID) {
                throw new UnauthorizedAccessError();
            }

            if (username) {
                const existingUserByUsername =
                    await this.usersRepository.findByUsername(username);
                if (
                    existingUserByUsername &&
                    existingUserByUsername.id !== currentUserID
                ) {
                    throw new UserInfoAlreadyExistError();
                }
            }

            if (newEmail && newEmail !== oldEmail) {
                const existingUserByEmail =
                    await PrismaUsersRepository.findByEmail(newEmail);
                if (
                    existingUserByEmail &&
                    existingUserByEmail.id !== currentUserID
                ) {
                    throw new UserInfoAlreadyExistError();
                }
                oldEmail = newEmail;
            }

            const passwordsMatch = await compare(
                oldPassword,
                user.password_hash,
            );

            if (!passwordsMatch) {
                throw new PasswordsDoNotMatchError();
            }

            const newPasswordHash = await hash(password, 5);

            const updatedUser = await this.usersRepository.updateInfo({
                name,
                username,
                oldEmail,
                password: newPasswordHash,
                currentUserID,
            });

            return { user: updatedUser };
        } catch (error) {
            console.error(error);
            throw new InternalServerError();
        }
    }
}
