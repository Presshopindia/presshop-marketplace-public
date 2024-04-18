// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5aDquFlvcWaU84s0fv79pw0JgbwiwXCE",
    authDomain: "presshopdev-db299.firebaseapp.com",
    projectId: "presshopdev-db299",
    storageBucket: "presshopdev-db299.appspot.com",
    messagingSenderId: "750460561502",
    appId: "1:750460561502:web:e06a575c50f0e03040accf",
    measurementId: "G-HEXH5PGC0B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rdb = getDatabase(app);
export const storage = getStorage(app);

export const messaging = getMessaging(app);