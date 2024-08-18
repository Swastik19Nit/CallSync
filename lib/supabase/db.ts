import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator'; // Use the correct migrator for PostgreSQL

dotenv.config({ path: '.env' }); // Corrected path to '.env'

if (!process.env.DATABASE_URL) {
    console.log("No database URL found in .env file");
    process.exit(1); // Exit the process if the database URL is not found
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });

const migrateDb = async () => {
    try {
        console.log("Migrating database");
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log("Migration completed successfully");
    } catch (error) {
        console.error("Migration failed", error);
    }
};

migrateDb();

export default db;
