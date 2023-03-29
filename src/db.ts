import { Pool } from 'pg';

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_typescript",
    password: "pirate",
    port: 5432,
});

