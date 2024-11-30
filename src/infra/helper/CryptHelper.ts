import bcrypt from 'bcrypt';

export class CryptHelper {
    static async hash(text: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(text, saltRounds);
    }
}