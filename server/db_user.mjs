import { db } from "./database.mjs"

export async function IsExists(userCredential, credentialType) {
    // TODO: credential type could be NONE or INVALID (need to make a check)

    let query = {
        text: `SELECT EXISTS(SELECT 1 FROM users WHERE ${credentialType}=$1)`,
        values: [userCredential],
    }

    try {
        const result = await db.query(query)
        console.log(result.rows)
        return result.rows[0].exists// Return the value inside the query
    } catch (err) {
        console.error(err)
    }
}