import * as crypto from 'crypto';

export class CryptHelper {
    static async hash(text: string): Promise<string> {
        const hash = crypto.createHash('sha256');
        hash.update(text);
        return hash.digest('hex');
    }
}