import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { count, eq, sql } from 'drizzle-orm';
import { userTable } from './schema';
import { hashPassword } from '../credentials';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
export const db = drizzle(postgres(env.DATABASE_URL));