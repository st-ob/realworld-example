import { fail, redirect } from '@sveltejs/kit';
import { verifyPasswordHash } from '$lib/server/password';
import { getUserFromEmail } from '$lib/server/db';
import type { Actions } from './$types';

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

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

        return redirect(302, '/');
	}
} satisfies Actions;