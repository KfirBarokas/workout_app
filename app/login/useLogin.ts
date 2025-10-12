import { useRouter } from "expo-router";
import { useState } from "react";
import { INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/services/firebase/auth";
import { useOTP } from "../otp/useOTP";
import { useFormField } from "@/hooks/useFormField";

// Helper functions
function normalizePhone(phone: string) {
    return phone.replace(/[\s()-]/g, "");
}
function isPhoneNumberValid(phone: string) {
    let normalized = normalizePhone(phone)

    if (!normalized) {
        return { valid: false, message: INVALID_CREDENTIAL_MESSAGES.empty };
    }

    if (!/^05\d{8}$/.test(normalized)) {
        return { valid: false, message: INVALID_CREDENTIAL_MESSAGES.notPhoneNumber };
    }

    return { valid: true, message: "" };
}
function toE164(phone: string) {
    const normalized = normalizePhone(phone);
    if (normalized.startsWith("0")) return "+972" + normalized.slice(1);
    return normalized;
}
function formatPhoneNumber(phone: string) {
    const digits = phone.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 10) return digits.slice(0, 3) + "-" + digits.slice(3);
    return digits.slice(0, 3) + "-" + digits.slice(3, 10);
}


export function useLogin() {
    const router = useRouter();
    const { recaptchaVerifierRef, sendOTP } = useOTP();

    const phoneNumberField = useFormField<string>("", isPhoneNumberValid)

    function handlePhoneInput(input: string) {
        phoneNumberField.setValue(formatPhoneNumber(input));
    }

    async function loginUser() {
        if (!phoneNumberField.validate()) {
            return;
        }

        const e164PhoneNumber = toE164(phoneNumberField.value);

        try {
            const verificationId = await sendOTP(e164PhoneNumber);
            router.replace({ pathname: "/otp", params: { verificationId } }); // pass verificationId
        } catch (err: any) {
            console.error("Login error:", err.message);
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
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    }

    return {
        phoneNumberField,
        loginUser,
        handlePhoneInput,
        signInWithGoogle,
        recaptchaVerifierRef,
    };
}
