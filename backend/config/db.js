import { neon, neonConfig } from "@neondatabase/serverless";
import { fetchWithProxy } from "./fetchWithProxy.js";

neonConfig.fetchFunction = fetchWithProxy;

import"dotenv/config";

// Creates a SQL connection using our DB URL
export const sql = neon(process.env.DATABASE_URL)

export async function initDB() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )`;
        // Ensure unique constraints exist even if table already existed
        await sql`ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS unique_username UNIQUE (username)`;
        await sql`ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS unique_email UNIQUE (email)`;
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log("Database initialized successfully")
    } catch (error) {
        console.log("Error initializing DB", error)
        process.exit(1) // status code 1 means failure, 0 success
    }
    
}