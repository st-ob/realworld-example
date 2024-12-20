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

// create url name for the user profile
export function createUrlPath(username: string) {
	return username
        .trim()                         	// Remove any leading/trailing whitespace
        .toLowerCase()                  	// Convert to lowercase for consistency
        .replace(/\s+/g, '-')            	// Replace spaces with hyphens
        .replace(/[^\w\-]/g, '')         	// Remove any non-word characters (except hyphens and underscores)
        .replace(/--+/g, '-')            	// Replace multiple consecutive hyphens with a single hyphen
        .replace(/^-+/, '')              	// Remove hyphen from the start
        .replace(/-+$/, '');             	// Remove hyphen from the end
}

// create slug url from article titles
export function createArticleSlug(title: string) {
	return title
		.slice(0, 20)						// Cut after 15 characters
		.toLowerCase()                  	// Convert to lowercase for consistency
		.replace(/\s+/g, '-')            	// Replace spaces with hyphens
        .replace(/[^\w\-]/g, '')         	// Remove any non-word characters (except hyphens and underscores)
        .replace(/--+/g, '-')            	// Replace multiple consecutive hyphens with a single hyphen
        .replace(/^-+/, '')              	// Remove hyphen from the start
        .replace(/-+$/, '');             	// Remove hyphen from the end
}