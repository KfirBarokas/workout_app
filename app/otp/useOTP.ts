import { useRef, useState } from "react";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "@/services/firebase/auth";

export function useOTP() {
    const recaptchaVerifierRef = useRef<FirebaseRecaptchaVerifierModal>(null);
    const [loading, setLoading] = useState(false);

    async function sendOTP(phoneNumber: string) {
        if (!recaptchaVerifierRef.current) throw new Error("Recaptcha not ready");
        try {
            setLoading(true);
            const provider = new PhoneAuthProvider(auth);
            const verificationId = await provider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifierRef.current
            );
            return verificationId;
        } finally {
            setLoading(false);
        }
    }

    async function verifyOTP(code: string, verificationId: string) {
        if (!verificationId) throw new Error("No verificationId");
        try {
            const credential = PhoneAuthProvider.credential(verificationId, code);
            let userCredential = await signInWithCredential(auth, credential);
            let userId = userCredential.user.uid;

            return { valid: true, userId: userId };
        } catch (err) {
            console.error("OTP verification failed:", err);
            return { valid: false };
        }
    }


    return {
        recaptchaVerifierRef,
        sendOTP,
        verifyOTP,
        loading,
    };
}
