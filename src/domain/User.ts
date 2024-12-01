
export enum UserRole {
    Admin = 'admin',
    Client = 'client',
}

export class User {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    createdAt: number;
    updatedAt: number;
    role: UserRole;
}
