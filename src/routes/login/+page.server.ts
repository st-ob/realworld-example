import { fail, redirect } from '@sveltejs/kit';
import { verifyPasswordHash, getUserFromEmail } from '$lib/server/credentials';
import type { Actions, PageServerLoad } from './$types';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = async ({locals, url}) => {
    // if user is already logged in, redirect to homepage
    if(locals.user) {
        throw redirect(302, "/");
    }

    // if url has redirect path, add a message to the data
    if(url.searchParams.get('redirectTo')) {
        return {
            redirectMessage: true
        }
    }
};

export const actions = {
	default: async (event) => {
        // extract inpurt data from form
		const data = await event.request.formData();
        const email = data.get('email');
        const password = data.get('password');

        // validate input data
        if (typeof email !== "string" || typeof password !== "string") {
            return fail(400, {
                message: "Invalid or missing fields",
                email: "",
                username: ""
            });
        }
        if (email === "" || password === "") {
            return fail(400, {
                message: "Please enter your email, and password",
                email: "",
                username: ""
            });
        }
        if (!(/^.+@.+\..+$/.test(email)) || email.length > 256) {
            return fail(400, {
                message: "Invalid email",
                email
            });
        }
        const user = await getUserFromEmail(email);
        if (!user) {
            return fail(400, {
                message: "Account does not exist",
                email
            });
        }
        if (!verifyPasswordHash(user.passwordHash, password)) {
            return fail(400, {
                message: "Invalid password",
                email
            });
        }

        // create session and set session token cookie
        const token = generateSessionToken();
        const session = await createSession(token, user.id);
        setSessionTokenCookie(event, token, session.expiresAt);

        // get redirect link in case unauthorized person clicked on protected site and will be redirected after this login
        const redirectTo = event.url.searchParams.get("redirectTo");
		if (redirectTo) {
			throw redirect(302, `/${redirectTo.slice(1)}`)
		}
		throw redirect(302, "/")
	}
} satisfies Actions;