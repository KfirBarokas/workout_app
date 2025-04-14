import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
// TODO: Add error handling
export async function CreateVerification(phoneNumber) {
    const verification = await client.verify.v2
        .services("VA5b9e12075d0ddc2b5d457ca5bcddba97")
        .verifications.create({
            channel: "sms",
            to: `+${phoneNumber}`,
        });

    return verification.sid;
}

// TODO: Add error handling
export async function CreateVerificationCheck(code, phoneNumber) {
    const verificationCheck = await client.verify.v2
        .services("VA5b9e12075d0ddc2b5d457ca5bcddba97")
        .verificationChecks.create({
            code: `${code}`,
            to: `+${phoneNumber}`,
        });

    return verificationCheck.status;
}