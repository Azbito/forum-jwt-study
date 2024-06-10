export class InvalidCredentialsError extends Error {
    constructor(message = '🚧 Invalid credentials') {
        super(message);
        this.name = 'InvalidCredentialsError';
    }
}

export class MissingCredentialsError extends Error {
    constructor(message = '⚠️ Please, specify an email or username') {
        super(message);
        this.name = 'MissingCredentialsError';
    }
}

export class InternalServerError extends Error {
    constructor(message = '🚧 Internal server error') {
        super(message);
        this.name = 'InternalServerError';
    }
}

export class UnauthorizedAccessError extends Error {
    constructor(message = '🚧 Anauthorized acess') {
        super(message);
        this.name = 'UnauthorizedAccessError';
    }
}

export class UserInfoAlreadyExistError extends Error {
    constructor(message = '📃 User info already exists') {
        super(message);
        this.name = 'UserInfoAlreadyExistError';
    }
}

export class PasswordsDoNotMatchError extends Error {
    constructor(message = '❌ Passwords do not match') {
        super(message);
        this.name = 'PasswordsDoNotMatchError';
    }
}

export class EmailOrUsernameMustBeDeclaredError extends Error {
    constructor(message = '⚠️ Either email or username must be provided') {
        super(message);
        this.name = 'EmailOrUsernameMustBeDeclaredError';
    }
}

export class UserNotFoundError extends Error {
    constructor(message = '🤔 User not found') {
        super(message);
        this.name = 'UserNotFoundError';
    }
}
