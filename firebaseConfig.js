import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDr2lvCOysnbK87tACMrlJavQlnIqnr6dg",
  authDomain: "location-picker-c4479.firebaseapp.com",
  projectId: "location-picker-c4479",
  storageBucket: "location-picker-c4479.firebasestorage.app",
  messagingSenderId: "839580635749",
  appId: "1:839580635749:web:bcb1afdf1e5e62cb226c8c",
  measurementId: "G-TESG5DTPG4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
