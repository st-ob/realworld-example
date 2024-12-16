import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { db } from "./db";
import { session } from "./db/schema";


export function generateSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);

    return token;
}

export async function createSession(token: string, userId: number) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const row = await db.insert(session).values({
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 *24 * 30) //30 days in milliseconds from now
    }).returning();

    return row[0];
}

export async function validateSessionToken(token: string) {
    
}

export async function invalidateSession(sessionId: string) {
    
}