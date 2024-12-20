import { db } from '$lib/server/db';
import { articleTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params, parent}) => {
    const { user } = await parent();
    console.log(user);
    const article = (await db.select().from(articleTable).where(eq(articleTable.slug, params.slug)))[0] ?? null;
    let author = null;
    if(article) {
        author = (await db.select().from(userTable).where(eq(userTable.id, article.authorId)))[0];
    }
    console.log(article);
    console.log(author);

    return {
        user,
        article,
        author
    }
};