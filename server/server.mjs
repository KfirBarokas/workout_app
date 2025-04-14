import express from "express";

// Database helper functions
import * as user_utils from './db_user.mjs'
import { CreateVerification, CreateVerificationCheck } from "./otp_service.mjs";

const app = express();

app.use(express.json())
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});


app.post('/login', async (req, res) => {
    console.log("Login")


    res.json({
        exists: await user_utils.IsExists(req.body.credential, req.body.credentialType)
    })
});

app.post('/sendOTP', async (req, res) => {
    console.log('sending OTP...')

    if (res.body.credentialType === 'email') {
        // OTP Via Email
    }
    else if (res.body.credentialType === 'phone_number') {
        await CreateVerification(req.body.credential)
    }
})

app.post('/checkOTP', async (req, res) => {
    console.log('checking OTP code');


})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});