import { db } from "./database.mjs"

export async function IsExists() {
    const query = {
        // name: 'get-name',
        // text: 'SELECT * FROM test WHERE age = $1',
        text: 'SELECT EXISTS(SELECT 1 FROM users WHERE phone_number=$1)',
        values: ['0541234567'],
    }

    try {
        const result = await db.query(query)
        console.log(result.rows)
        return result
    } catch (err) {
        console.error(err)
    }
}