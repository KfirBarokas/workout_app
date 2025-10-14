import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithPhoneNumber } from "@react-native-firebase/auth";

export function useOTP() {
    const [loading, setLoading] = useState(false);
    const [confirm, setConfirm] = useState<any>(null);

    // Optional: automatically handle auth state
    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), (user) => {
            if (user) {
                console.log("User logged in automatically:", user.uid);
            }
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    async function sendOTP(phoneNumber: string) {
        setLoading(true);
        try {
            const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
            setConfirm(confirmation);
            return confirmation;
        } finally {
            setLoading(false);
        }
    }

    async function verifyOTP(code: string) {
        if (!confirm) throw new Error("No confirmation object. Send OTP first.");
        try {
            await confirm.confirm(code);
            return { valid: true };
        } catch (err) {
            console.error("Invalid code:", err);
            return { valid: false };
        }
    }

    return {
        sendOTP,
        verifyOTP,
        loading,
    };
}
