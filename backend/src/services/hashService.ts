import * as bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS ?? '10', 10);

export class HashingService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}