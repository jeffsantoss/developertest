import * as crypto from 'crypto';

const MIN_PASSWORD_LENGTH = 8;

export class SecurityHelper {
    static async sha256Hash(text: string): Promise<string> {
        const hash = crypto.createHash('sha256');
        hash.update(text);
        return hash.digest('hex');
    }

    static isPasswordSecure(password: string): boolean {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= MIN_PASSWORD_LENGTH && hasLetter && hasNumber;
    }
}