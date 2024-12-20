import crypto from 'crypto'
import { count, eq } from 'drizzle-orm';

import { db } from './db';
import { userTable } from './db/schema';
import { createUrlPath } from '$lib/utils';

const hashSettings = {cost: 131072, blockSize: 8, parallelization: 1, maxmem: 140000000}; //based on OWASP recommendations
const hashLength = 64;

export function hashPassword(password: string) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPwd = crypto.scryptSync(password, salt, hashLength, hashSettings);
    
    return hashedPwd.toString('hex') + '.' + salt;
}

export function verifyPasswordHash(hash: string, password: string) {
    const [storedPwd, salt] = hash.split('.');
    const hashedPwd = crypto.scryptSync(password, salt, hashLength, hashSettings);
    const storedPwdBuffer = Buffer.from(storedPwd, 'hex');

    return crypto.timingSafeEqual(hashedPwd, storedPwdBuffer);
}

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const row = await db.select({ count: count() }).from(userTable).where(eq(userTable.email, email));
    if(row === null) {
        throw new Error('Error during check of email!');
    }
    return row[0].count === 0;
}

export async function createUser(email: string, username: string, password: string) {
    const users = await db.insert(userTable).values({
        email: email,
        username: username,
        profilePath: createUrlPath(username),
        passwordHash: hashPassword(password)
    }).returning();

    return users[0];
}

export async function getUserFromEmail(email: string) {
    const users = await db.select().from(userTable).where(eq(userTable.email, email));

    return users[0];
}