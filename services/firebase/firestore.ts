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


// phone
// nickname
// gender - male / female / other
// profile type - regular / coach

// date of birth - optional
// profile picture - optional
// bio - optional

export async function registerUser(authUserId: string, phoneNumber: string, nickname: string, profileType: string, gender: string, birthDate: string, bio: string, profilePicture: string) {

    await setDoc(doc(db, "users", uid), {
        displayName,
        email,
        createdAt: new Date(),
    });

    return uid;
}