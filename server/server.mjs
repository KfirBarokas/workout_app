import express from "express";

// Database helper functions
import * as user_utils from './db_user.mjs'

const app = express();

app.use(express.json())
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});


app.post('/login', (req, res) => {
    console.log("HI")
    console.log(req.body)

    res.json({
        exists: user_utils.IsExists(req.body.credential, req.body.credentialType)//Check if works didnt test
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});