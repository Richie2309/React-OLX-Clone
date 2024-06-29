import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAAbav9Ms5aXoemySS2fBgiTejG1POgNyA",
    authDomain: "olx-app-6d82b.firebaseapp.com",
    projectId: "olx-app-6d82b",
    storageBucket: "olx-app-6d82b.appspot.com",
    messagingSenderId: "1094319151867",
    appId: "1:1094319151867:web:275c04f48e0bdfc78eee5e",
    measurementId: "G-M79SJ9GE8C"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app)
export const storage=getStorage(app)
export default app
