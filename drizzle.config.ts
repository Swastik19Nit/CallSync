import { defineConfig } from "drizzle-kit"
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    console.log("Can't find DATABASE_URL in .env");
}

export default defineConfig({
    schema: './lib/supabase/schema.ts',
    out: './migrations',
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL || '',
    }
})

  