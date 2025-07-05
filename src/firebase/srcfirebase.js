// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfg7JMmpkLKJilMxxQKKSIW_CLNfcD1Lk",
  authDomain: "transfermate-cbae6.firebaseapp.com",
  projectId: "transfermate-cbae6",
  storageBucket: "transfermate-cbae6.firebasestorage.app",
  messagingSenderId: "127089811847",
  appId: "1:127089811847:web:21a573baf30e9990637322",
  measurementId: "G-JB0KZTY92S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };