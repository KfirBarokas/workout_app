// src/helpers/firebaseHelper.js
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { db, auth } from "../firebase/firebase.ts";

// --- Firestore CRUD --- //

export const getCollection = async (colName) => {
    const snapshot = await getDocs(collection(db, colName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getDocument = async (colName, id) => {
    const ref = doc(db, colName, id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const addDocument = async (colName, data) => {
    const ref = await addDoc(collection(db, colName), data);
    return ref.id;
};

export const updateDocument = async (colName, id, data) => {
    const ref = doc(db, colName, id);
    await updateDoc(ref, data);
};

export const deleteDocument = async (colName, id) => {
    const ref = doc(db, colName, id);
    await deleteDoc(ref);
};

// --- Auth Helpers --- //

export const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};

export const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );
    return userCredential.user;
};

export const logout = async () => {
    await signOut(auth);
};

// Listen for auth state changes
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback); // unsubscribe function returned
};
