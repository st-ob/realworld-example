CREATE TABLE IF NOT EXISTS "_ArticleToTag" (
	"article" integer NOT NULL,
	"tag" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_UserFavorites" (
	"article" integer NOT NULL,
	"user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_UserFollows" (
	"follower" integer NOT NULL,
	"followed" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Article" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"body" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"body" text NOT NULL,
	"articleId" integer NOT NULL,
	"authorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"expires_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"image" text DEFAULT 'https://api.realworld.io/images/smiley-cyrus.jpeg'::text,
	"bio" text,
	CONSTRAINT "User_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_ArticleToTag_AB_unique" ON "_ArticleToTag" USING btree ("article","tag");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_ArticleToTag_B_index" ON "_ArticleToTag" USING btree ("tag");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_UserFavorites_AB_unique" ON "_UserFavorites" USING btree ("article","user");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_UserFavorites_B_index" ON "_UserFavorites" USING btree ("user");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_UserFollows_AB_unique" ON "_UserFollows" USING btree ("follower","followed");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_UserFollows_B_index" ON "_UserFollows" USING btree ("followed");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Article.slug_unique" ON "Article" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Article_pkey" ON "Article" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Comment_pkey" ON "Comment" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Session_pkey" ON "Session" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Tag.name_unique" ON "Tag" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Tag_pkey" ON "Tag" USING btree ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User.email_unique" ON "User" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User.username_unique" ON "User" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "User_pkey" ON "User" USING btree ("id");