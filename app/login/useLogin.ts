import { useRouter } from "expo-router";
import { useState, useRef } from "react";
import { INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth";
import { sendOTP } from "./authFlow";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

// --- Helper functions ---
function normalizePhone(phone: string) {
    return phone.replace(/[\s()-]/g, "");
}

function isPhoneNumberValid(phone: string) {
    // Israeli mobile numbers: 05 + 8 digits
    return /^05\d{8}$/.test(phone);
}

function toE164(phone: string) {
    const normalized = normalizePhone(phone);
    if (normalized.startsWith("0")) {
        return "+972" + normalized.slice(1);
    }
    return normalized; // already in E.164
}

function formatPhoneNumber(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 10) return digits.slice(0, 3) + "-" + digits.slice(3);
    return digits.slice(0, 3) + "-" + digits.slice(3, 10);
}

// --- Hook ---
export function useLogin() {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [invalidPhoneNumberMessage, setInvalidPhoneNumberMessage] = useState(
        INVALID_CREDENTIAL_MESSAGES.noMessage
    );

    // Recaptcha ref for Expo
    const recaptchaVerifierRef = useRef<FirebaseRecaptchaVerifierModal>(null);

    // Update phone input and auto-format with dash
    function handlePhoneInput(input: string) {
        const formatted = formatPhoneNumber(input);
        setPhoneNumber(formatted);
    }

    function showInvalidPhoneNumberModal(message: string) {
        setInvalidPhoneNumberMessage(message);
    }

    async function loginUser() {
        const normalizedPhoneNumber = normalizePhone(phoneNumber);
        if (!isPhoneNumberValid(normalizedPhoneNumber)) {
            showInvalidPhoneNumberModal(INVALID_CREDENTIAL_MESSAGES.notPhoneNumber);
            return;
        }

        const e164PhoneNumber = toE164(normalizedPhoneNumber);

        try {
            console.log("Sending OTP to:", e164PhoneNumber);
            await sendOTP(e164PhoneNumber, recaptchaVerifierRef.current);
            router.push("/otp"); // navigate to OTP input screen
        } catch (err: any) {
            console.error("Login error:", err.message);
            showInvalidPhoneNumberModal("Failed to send OTP. Try again.");
        }
    }

    async function signInWithGoogle() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (userInfo?.data?.idToken) {
                const { idToken } = userInfo.data;
                const googleCredential = GoogleAuthProvider.credential(idToken);
                const userCredential = await signInWithCredential(auth, googleCredential);
                console.log("Firebase user:", userCredential.user);
                router.replace("/(tabs)");
            } else {
                console.warn("Google sign-in canceled or failed");
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    }

    return {
        phoneNumber,
        setPhoneNumber: handlePhoneInput,
        invalidPhoneNumberMessage,
        loginUser,
        signInWithGoogle,
        recaptchaVerifierRef, // now correctly a hook inside the custom hook
    };
}
