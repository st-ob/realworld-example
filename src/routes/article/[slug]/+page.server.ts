import { db } from '$lib/server/db';
import { _articleToTag, articleTable, tagTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({params, parent}) => {
    const { user } = await parent();
    const article = (await db.select().from(articleTable).where(eq(articleTable.slug, params.slug)))[0] ?? null;

    if(!article) {
        throw fail(400, {
            message: "No article found!"
        });
    }

    const author = (await db.select().from(userTable).where(eq(userTable.id, article.authorId)))[0];
    const tags = await db
                .select({name: tagTable.name, id: tagTable.id})
                .from(tagTable)
                .innerJoin(_articleToTag, eq(_articleToTag.tag, tagTable.id))
                .where(eq(_articleToTag.article, article.id));

    return {
        user,
        article,
        author,
        tags
    }
};