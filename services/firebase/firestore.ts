import { BirthDate, ImageUri } from "@/constants/registration";
import { auth, db } from "./auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function isUserExists(uid: string): Promise<boolean> {
    try {
        const userRef = doc(db, "users", uid);
        const snapshot = await getDoc(userRef);
        return snapshot.exists();
    } catch (err) {
        console.error("Error checking user existence:", err);
        return false;
    }
}




export async function registerUser(authUserId: string, phoneNumber: string, nickname: string, profileType: string, gender: string, birthDate: BirthDate, bio: string, profilePicture: ImageUri) {

    await setDoc(doc(db, "users", authUserId), {
        displayName,
        email,
        createdAt: new Date(),
    });

    return authUserId;
}