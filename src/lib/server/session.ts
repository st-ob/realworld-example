import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";

import { db } from "./db";
import { sessionTable, userTable, type SelectSession, type SelectUser} from "./db/schema";
import type { RequestEvent } from "@sveltejs/kit";

// create session token with (at least) 20 random bytes, encode as base32 for case-insensitivity, alphanumeric and more compact than hex
export function generateSessionToken() {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const token = encodeBase32LowerCaseNoPadding(bytes);

    return token;
}

// create session with sessionId as SHA256 hashed token and 30 day expiration
export async function createSession(token: string, userId: number) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const rows = await db.insert(sessionTable).values({
        id: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 *24 * 30) //30 days in milliseconds from now
    }).returning();

    return rows[0];
}

// validate session token in 2 steps: existance in database and within expiration date
export async function validateSessionToken(token: string) {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    
    // Step 1: Get session by sessionId and check if it exists
    const result = await db
        .select({user: userTable, session: sessionTable})
        .from(sessionTable)
        .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
        .where(eq(sessionTable.id, sessionId));
    if(result.length < 1) {
        return {session: null, user: null};
    }
    const {session, user} = result[0];

    // Step 2: check expiration date
    if(Date.now() >= session.expiresAt.getTime()) {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
        return {session: null, user: null};
    }
    // extend expiration by 30 days if still validate for 15 days
    if(Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 *24 * 30) //30 days in milliseconds from now
        await db.update(sessionTable).set({
            expiresAt: session.expiresAt
        }).where(eq(sessionTable.id, sessionId));
    }

    return {session, user};
}

// invalidate sessions
export async function invalidateSession(sessionId: string) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));   
}

// set the session token cookie (secure flag is automatically added by Sveltekit in production)
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
    event.cookies.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
}

// set session token cookie back (delete the cookie)
export function deleteSessionTokenCookie(event: RequestEvent) {
    event.cookies.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    });
}

export type SessionValidationResult =
	| { session: SelectSession; user: SelectUser }
	| { session: null; user: null };
