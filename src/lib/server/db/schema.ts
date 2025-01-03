import { pgTable, uniqueIndex, serial, text, timestamp, integer, unique, index, date } from "drizzle-orm/pg-core"
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm"

export const articleTable = pgTable("Article", {
	id: serial("id").primaryKey().notNull(),
	slug: text("slug").notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	body: text("body").notNull(),
	createdAt: timestamp("createdAt", { mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'date' }).defaultNow().notNull(),
	authorId: integer("authorId").notNull(),
},
(table) => {
	return {
		slugUnique: uniqueIndex("Article.slug_unique").on(table.slug),
		pkey: uniqueIndex("Article_pkey").on(table.id),
	}
});

export const commentTable = pgTable("Comment", {
	id: serial("id").primaryKey().notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().notNull(),
	body: text("body").notNull(),
	articleId: integer("articleId").notNull(),
	authorId: integer("authorId").notNull(),
},
(table) => {
	return {
		pkey: uniqueIndex("Comment_pkey").on(table.id),
	}
});

export const sessionTable = pgTable("Session", {
	id: text("id").primaryKey().notNull(),
	userId: integer("userId").notNull(),
	expiresAt: date("expires_at", {mode: "date"}).notNull()
},
(table) => {
	return {
		pkey: uniqueIndex("Session_pkey").on(table.id),
	}
});

export const tagTable = pgTable("Tag", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
},
(table) => {
	return {
		nameUnique: uniqueIndex("Tag.name_unique").on(table.name),
		pkey: uniqueIndex("Tag_pkey").on(table.id),
	}
});

export const userTable = pgTable("User", {
	id: serial("id").primaryKey().notNull(),
	email: text("email").notNull(),
	username: text("username").notNull(),
	profilePath: text("profile").notNull(),
	passwordHash: text("password_hash").notNull(),
	image: text("image").default(sql`'https://api.realworld.io/images/smiley-cyrus.jpeg'::text`),
	bio: text("bio"),
},
(table) => {
	return {
		emailUnique: uniqueIndex("User.email_unique").on(table.email),
		emailKey: uniqueIndex("User_email_key").on(table.email),
		usernameUnique: uniqueIndex("User.username_unique").on(table.username),
		pkey: uniqueIndex("User_pkey").on(table.id),
		userEmailKey: unique("User_email_key").on(table.email),
	}
});

export const _articleToTag = pgTable("_ArticleToTag", {
	article: integer("article").notNull(),
	tag: integer("tag").notNull(),
},
(table) => {
	return {
		abUnique: uniqueIndex("_ArticleToTag_AB_unique").on(table.article, table.tag),
		bIdx: index("_ArticleToTag_B_index").on(table.tag),
	}
});

export const _userFavorites = pgTable("_UserFavorites", {
	article: integer("article").notNull(),
	user: integer("user").notNull(),
},
(table) => {
	return {
		abUnique: uniqueIndex("_UserFavorites_AB_unique").on(table.article, table.user),
		bIdx: index("_UserFavorites_B_index").on(table.user),
	}
});

export const _userFollows = pgTable("_UserFollows", {
	follower: integer("follower").notNull(),
	followed: integer("followed").notNull(),
},
(table) => {
	return {
		abUnique: uniqueIndex("_UserFollows_AB_unique").on(table.follower, table.followed),
		bIdx: index("_UserFollows_B_index").on(table.followed),
	}
});

export type SelectArticle = InferSelectModel<typeof articleTable>
export type InsertArticle = InferInsertModel<typeof articleTable>
export type SelectComment = InferSelectModel<typeof commentTable>
export type InsertComment = InferInsertModel<typeof commentTable>
export type SelectSession = InferSelectModel<typeof sessionTable>
export type InsertSession = InferInsertModel<typeof sessionTable>
export type SelectUser = InferSelectModel<typeof userTable>
export type InsertUser = InferInsertModel<typeof userTable>
export type SelectTag = InferSelectModel<typeof tagTable>
export type InsertTag = InferInsertModel<typeof tagTable>