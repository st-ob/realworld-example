import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "$lib/server/session";
import { redirectToProtectedPath } from "$lib/utils";
import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve}) => {
    // check if token cookie is available
    const token = event.cookies.get("session") ?? null;
    const path = event.url.pathname;
    if(!token) {
        return resolve(redirectToProtectedPath(event));
    }

    // check for valid session
    const validatedUser = await validateSessionToken(token);
    if(validatedUser?.session) {
        setSessionTokenCookie(event, token, validatedUser.session.expiresAt);
    } else {
        deleteSessionTokenCookie(event);
        return resolve(redirectToProtectedPath(event));
    }

    // set event locals for use in load functions of layouts and pages
    event.locals.session = validatedUser.session;
    event.locals.user = validatedUser.user;
    return resolve(event);
}