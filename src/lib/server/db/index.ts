import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { count, sql } from 'drizzle-orm';
import { user } from './schema';
import { hashPassword } from '../password';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
export const db = drizzle(postgres(env.DATABASE_URL));

export async function checkEmailAvailability(email: string): Promise<boolean> {
    const row = await db.select({ count: count() }).from(user).where(sql`${user.email} = ${email}`);
    if(row === null) {
        throw new Error('Error during check of email!');
    }
    return row[0].count === 0;
}

export async function createUser(email: string, username: string, password: string) {
    const users = await db.insert(user).values({
        email: email,
        username: username,
        passwordHash: hashPassword(password)
    }).returning();

    return users[0];
}

export async function getUserFromEmail(email: string) {
    const users = await db.select().from(user).where(sql`${user.email} = ${email}`);

    return users[0];
}
