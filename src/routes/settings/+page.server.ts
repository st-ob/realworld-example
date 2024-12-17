import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/session";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions = {
    logout: async (event) => {
        console.log("in logout action");
        const session = event.locals.session;
        if(session) {
            invalidateSession(session.id);
        }
        deleteSessionTokenCookie(event);
        throw redirect(302, "/");
    }
} satisfies Actions;