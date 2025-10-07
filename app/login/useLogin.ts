import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { CREDENTIAL_TYPES, INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth";

import ServerHttpRequest from "../../services/axios_request.mjs";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from '../../services/firebase/firebase'; // optional, if using Firebase Auth
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";


function isValidEmail(input: string) {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function GetCredentialType(credential: string) {
    if (isValidEmail(credential)) {
        return CREDENTIAL_TYPES.EMAIL;
    }
    if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(credential)) {
        return CREDENTIAL_TYPES.PHONE_NUMBER;
    }
    return CREDENTIAL_TYPES.INVALID;
}

export function useLogin() {
    const router = useRouter();

    const [loginCredential, setLoginCredential] = useState("");
    const [invalidCredentialModalVisible, setInvalidCredentialModalVisible] =
        useState(false);
    const [invalidCredentialMessage, setInvalidCredentialMessage] = useState(
        INVALID_CREDENTIAL_MESSAGES.noMessage
    );
    const [credentialNotFoundType, setCredentialNotFoundType] = useState(
        CREDENTIAL_TYPES.NONE
    );
    const [enteredCredential, setEnteredCredential] = useState("");

    function ShowInvalidCredentialModal() {
        setInvalidCredentialModalVisible(true);
    }

    function UpdateInvalidCredentialMessage(credential: string) {
        if (!credential) {
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.empty);
        } else {
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.notPhoneOrEmail);
        }
    }

    async function LoginUser() {
        const credentialType = GetCredentialType(loginCredential);

        if (credentialType === CREDENTIAL_TYPES.INVALID) {
            UpdateInvalidCredentialMessage(loginCredential);
            return;
        }

        setEnteredCredential(loginCredential);
        setCredentialNotFoundType(credentialType);

        const credentialData = {
            credential: loginCredential,
            credentialType: credentialType,
        };

        try {
            // 🔹 Example usage of helper
            if (credentialType === CREDENTIAL_TYPES.EMAIL) {
                // try login with Firebase (password could be collected separately)
                // const user = await login(loginCredential, "123456");
                // console.log("Firebase login success:", user.uid);
            }

            // 🔹 Keep your backend request logic
            const response = await ServerHttpRequest("post", "/login", credentialData);

            if (response) {
                if (response.data.exists) {
                    await ServerHttpRequest("post", "/sendOTP", credentialData);
                    router.navigate({ pathname: `/otp` });
                } else {
                    ShowInvalidCredentialModal();
                }
            }
        } catch (err: any) {
            console.error("Login error:", err.message);
            ShowInvalidCredentialModal();
        }
    }

    async function signInWithGoogle() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('User info:', userInfo);

            if (userInfo.type === 'success' && userInfo.data?.idToken) {
                const { idToken } = userInfo.data;
                const googleCredential = GoogleAuthProvider.credential(idToken);
                const userCredential = await signInWithCredential(auth, googleCredential);
                console.log('✅ Firebase user:', userCredential.user);
                router.navigate({ pathname: `/(tabs)` });

            } else {
                console.log('❌ Google sign-in canceled or failed:', userInfo.type);
            }

            // save userInfo.idToken or userInfo.user to your app state / backend
        } catch (error) {
            console.error(error);
        }
    };

    return {
        loginCredential,
        setLoginCredential,
        invalidCredentialModalVisible,
        setInvalidCredentialModalVisible,
        invalidCredentialMessage,
        credentialNotFoundType,
        enteredCredential,
        LoginUser,
        signInWithGoogle,
    };
}