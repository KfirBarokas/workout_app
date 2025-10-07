import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential, getAuth } from "firebase/auth";

// Required for Expo Auth
WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "766634426305-gdh4u518okpthasg3keukh55jbp5fq28.apps.googleusercontent.com", // from Firebase console
    });

    const auth = getAuth();

    async function signInWithGoogle() {
        if (response?.type === "success") {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);
            return await signInWithCredential(auth, credential);
        }
    }

    return { request, promptAsync, signInWithGoogle };
}
