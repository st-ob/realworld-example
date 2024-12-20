import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { articleTable, type InsertArticle } from '$lib/server/db/schema';
import { createArticleSlug } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({url}) => {
    const articleId = Number(url.searchParams.get("articleId")) ?? null;
    console.log(articleId);
    let article = null;
    if(articleId) {
        article = (await db.select().from(articleTable).where(eq(articleTable.id, articleId)))[0];
    }

    return {
        article
    }
};

export const actions: Actions = {
    default: async ({url, request, locals}) => {
        const articleId = Number(url.searchParams.get("articleId")) ?? null;
        const data = await request.formData();
        const title = data.get('title') as string;
        const slug = createArticleSlug(title)

        const article: InsertArticle = {
            title,
            description: data.get('description') as string,
            body: data.get('body') as string,
            slug,
            updatedAt: new Date(),
            authorId: locals.user!.id
        }

        if(articleId) {
            const { authorId } = (await db.select().from(articleTable).where(eq(articleTable.id, articleId)))[0];
            if (authorId !== locals.user!.id) {
                return fail(400, {
                    message: "Not authorized to change article!"
                })
            }
            await db.update(articleTable).set(article).where(eq(articleTable.id, articleId));
        } else{
            await db.insert(articleTable).values(article);
        }

        throw redirect(302, "/article/" + slug);
    }
};