import pg from 'pg'
import 'dotenv/config'
const { Pool } = pg

// TODO: WARNING! In production use a different method for .env variables, NOT dotenv
console.warn('WARNING! In production use a different method for .env variables, NOT dotenv')
console.warn('Pool connections need to be tweaked to match server capabilities.')

export const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20, // How many connections by default, if exceeded there is a wait time
    connectionTimeoutMillis: 0, // How long to wait for a pool to give a connection
    idleTimeoutMillis: 0, // When to get rid of the connection if not in use
});