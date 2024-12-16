import { fail, redirect } from '@sveltejs/kit';
import { checkEmailAvailability, createUser } from '$lib/server/db';
import type { Actions } from './$types';

export const actions = {
	default: async ({request}) => {
		const data = await request.formData();
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

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
        const user = await createUser(email, username, password);


        return redirect(302, '/');
	}
} satisfies Actions;