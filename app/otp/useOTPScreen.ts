import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useOTP } from "./useOTP";
import { isUserExists } from "@/services/firebase/firestore";
import { auth } from "@/services/firebase/auth";

export function useOtpScreen() {
    const router = useRouter();
    const { verifyOTP } = useOTP();

    const params = useLocalSearchParams();
    const rawPhone = params.phoneNumber;
    const phoneNumber = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone;

    const [enteredCode, setEnteredCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleVerify() {
        setLoading(true);
        try {
            setMessage(""); // reset previous messages

            const { valid } = await verifyOTP(enteredCode);

            if (!valid) {
                setMessage("Invalid OTP. Try again.");
                return;
            }

            const user = auth.currentUser;
            if (!user) throw new Error("User not found after OTP verification");

            const userExists = await isUserExists(user.uid);

            if (!userExists) {
                router.replace({ pathname: "/register", params: { userId: user.uid, phoneNumber } });
                return;
            }

            router.replace("/(tabs)");
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return {
        enteredCode,
        setEnteredCode,
        message,
        handleVerify,
        loading,
    };
}
