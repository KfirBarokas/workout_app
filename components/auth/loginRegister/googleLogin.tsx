// firebaseHelper.js
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/services/firebase/auth";

export const useGoogleAuth = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID, // 👈 Web client ID
    });

    const loginWithGoogle = async () => {
        if (response?.type === "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            return await signInWithCredential(auth, credential);
        }
    };

    return { request, response, promptAsync, loginWithGoogle };
};
