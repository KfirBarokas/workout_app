import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { auth, db } from "@/services/firebase/firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Send OTP to phone ---
// export async function sendOTP(
//     phoneNumber: string,
//     recaptchaVerifier: FirebaseRecaptchaVerifierModal | null
// ) {
//     if (!recaptchaVerifier) {
//         throw new Error("Recaptcha verifier not initialized");
//     }

//     try {
//         const confirmationResult = await signInWithPhoneNumber(
//             auth,
//             phoneNumber,
//             recaptchaVerifier
//         );
//         (global as any).confirmationResult = confirmationResult;
//         console.log("OTP sent to", phoneNumber);
//     } catch (err: any) {
//         console.error("Failed to send OTP:", err.message);
//         throw err;
//     }
// }

// --- Verify OTP and handle post-sign-in ---
// export async function verifyPhoneOTP(code: string, navigation: any) {
//     const confirmationResult = (global as any).confirmationResult;
//     if (!confirmationResult) throw new Error("No OTP session found");

//     const userCredential = await confirmationResult.confirm(code);
//     await handlePostSignIn(userCredential.user.uid, navigation);
// }

// --- Common post-login handler ---
// async function handlePostSignIn(uid: string, navigation: any) {
//     const userRef = doc(db, "users", uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//         navigation.navigate("Onboarding", { uid });
//     } else {
//         navigation.navigate("Home");
//     }
// }

// --- Create user profile after onboarding ---
// export async function createUserProfile(uid: string, profileData: any) {
//     await setDoc(doc(db, "users", uid), profileData);
// }
