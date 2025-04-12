import express from "express";
import { UserDataService } from "./database.mjs";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});


app.get('/login', (req, res) => {
    console.log("HI")
    res.json({
        exists: UserDataService.IsExists(res)//Check if works didnt test
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});