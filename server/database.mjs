import pg from 'pg'
const { Pool } = pg

export const db = new Pool({
    user: 'KfirArch',
    password: '',
    host: 'localhost',
    port: '5432',
    database: 'workoutDB',
    max: 20, // How many connections by default, if exceeded there is a wait time
    connectionTimeoutMillis: 0, // How long to wait for a pool to give a connection
    idleTimeoutMillis: 0, // When to get rid of the connection if not in use
});
console.warn('Pool connections need to be tweaked to match server capabilities.')