import express from "express";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});


app.get('/login', (req, res) => {
    console.log("HI")
    res.json({
        allowed: true
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});