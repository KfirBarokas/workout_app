import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useOTP } from "./useOTP";
import { isUserExists } from "@/services/firebase/firestore";

export function useOtpScreen() {
    const router = useRouter();
    const { recaptchaVerifierRef, verifyOTP } = useOTP();

    const params = useLocalSearchParams();
    const rawVerificationId = params.verificationId;
    const verificationId = Array.isArray(rawVerificationId)
        ? rawVerificationId[0]
        : rawVerificationId;

    const [enteredCode, setEnteredCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleVerify() {
        setLoading(true);
        try {
            if (!verificationId) {
                setMessage("No verification ID available. Retry sending OTP.");
                return;
            }

            setMessage(""); // reset previous messages

            const { valid, userId } = await verifyOTP(enteredCode, verificationId);

            if (!valid || !userId) {
                setMessage("Invalid OTP. Try again.");
                return;
            }

            let userExists = await isUserExists(userId)

            if (!userExists) {
                router.replace({ pathname: "/register", params: { userId } });
                return;
            }

            router.replace("/(tabs)");
        }
        catch (err) {
            console.error(err)
            return;
        }
        finally {
            setLoading(false)
        }
    }

    return {
        recaptchaVerifierRef,
        enteredCode,
        setEnteredCode,
        message,
        handleVerify,
        loading
    };
}
