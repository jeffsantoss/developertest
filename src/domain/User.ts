
export enum UserRole {
    Admin = 'admin',
    Client = 'client',
}

export class User {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    plainTextPassword: string;
    createdAt: number;
    updatedAt: number;
    role: UserRole;

    isValidPassword(): boolean {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(this.plainTextPassword);
        const hasNumber = /\d/.test(this.plainTextPassword);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.plainTextPassword);

        return this.plainTextPassword.length >= minLength && hasLetter && hasNumber && hasSpecialChar;
    }
}
