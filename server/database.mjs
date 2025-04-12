import pg from 'pg'
const { Client } = pg

const client = new Client({
    user: 'KfirArch',
    password: '',
    host: 'localhost',
    port: '5432',
    database: 'workoutDB',
});

await client.connect()

export class UserDataService {
    async IsExists() {
        const query = {
            // name: 'get-name',
            // text: 'SELECT * FROM test WHERE age = $1',
            text: 'SELECT EXISTS(SELECT 1 FROM users WHERE phone_number=$1)',
            values: ['0541234567'],
        }

        try {
            const result = await client.query(query)
            console.log(result.rows)
            return result
        } catch (err) {
            console.error(err)
        } finally {
            await client.end()
        }
    }
}




// https://node-postgres.com/apis/client

// Close connection
// client
//     .end()
//     .then(() => {
//         console.log('Connection to PostgreSQL closed');
//     })
//     .catch((err) => {
//         console.error('Error closing connection', err);
//     });