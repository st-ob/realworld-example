import { type RequestEvent, redirect } from "@sveltejs/kit"

const PROTECTED_PATHS = ["/editor", "/settings"];

export function handleLoginRedirect(event: RequestEvent) {
	const redirectTo = event.url.pathname + event.url.search
	return `/login?redirectTo=${redirectTo}`
}

export function isProtectedPath(event: RequestEvent): Boolean {
	const path = event.url.pathname;
	const result = PROTECTED_PATHS.some(protectedPath => path.includes(protectedPath))

	return result;
}

// if request page is protected, redirect to login page including redirect link to targeted page
export function redirectToProtectedPath(event: RequestEvent) {
	if(isProtectedPath(event)) {
		throw redirect(302, handleLoginRedirect(event));
	}

	return event;
}