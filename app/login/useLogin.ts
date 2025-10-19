import { useRouter } from "expo-router";
import { useState } from "react";
import { INVALID_CREDENTIAL_MESSAGES, ValidationResult } from "@/constants/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/services/firebase/auth";
import { useOTP } from "../otp/useOTP";
import { useFormField } from "@/hooks/useFormField";
import { formatPhoneNumber, toE164 } from "@/utils/format";
import { isPhoneNumberValid } from "@/utils/validation";

export function useLogin() {
    const router = useRouter();
    const { sendOTP } = useOTP();

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
            router.replace({ pathname: "/otp", params: { verificationId, phoneNumber: e164PhoneNumber } }); // pass verificationId
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

    function skipToRegister() {
        router.push("/register")
    }

    return {
        phoneNumberField,
        loginUser,
        handlePhoneInput,
        signInWithGoogle,
        skipToRegister
    };
}
