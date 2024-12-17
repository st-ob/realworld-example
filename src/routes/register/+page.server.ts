import { fail, redirect } from '@sveltejs/kit';
import { checkEmailAvailability, createUser } from '$lib/server/credentials';
import type { Actions, PageServerLoad } from './$types';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';

export const load: PageServerLoad = async ({locals}) => {
    // if user is already logged in, redirect to homepage
    if(locals.user) {
        throw redirect(302, "/");
    }   
};

export const actions = {
	default: async (event) => {
        // extract inpurt data from form
		const data = await event.request.formData();
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

        // validate input data
        if (typeof email !== "string" || typeof username !== "string" || typeof password !== "string") {
            return fail(400, {
                message: "Invalid or missing fields",
                email: "",
                username: ""
            });
        }
        if (email === "" || password === "" || username === "") {
            return fail(400, {
                message: "Please enter your username, email, and password",
                email: "",
                username: ""
            });
        }
        if (!(/^.+@.+\..+$/.test(email)) || email.length > 256) {
            return fail(400, {
                message: "Invalid email",
                email,
                username
            });
        }
        if (!checkEmailAvailability(email)) {
            return fail(400, {
                message: "Email is already used",
                email,
                username
            });
        }
        if (username.length < 3 || username.length > 32 || username.trim() !== username) {
            return fail(400, {
                message: "Invalid username",
                email,
                username
            });
        }
        if (password.length < 8 || password.length > 255) {
            return fail(400, {
                message: "Weak password",
                email,
                username
            });
        }

        // create user and session, and set session token cookie
        const user = await createUser(email, username, password);
        const token = generateSessionToken();
        const session = await createSession(token, user.id);
        setSessionTokenCookie(event, token, session.expiresAt);

        return redirect(302, '/');
	}
} satisfies Actions;