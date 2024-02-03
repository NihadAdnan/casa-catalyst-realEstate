// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-catalyst-c7389.firebaseapp.com",
  projectId: "real-catalyst-c7389",
  storageBucket: "real-catalyst-c7389.appspot.com",
  messagingSenderId: "696313076240",
  appId: "1:696313076240:web:68304ab7093468db774895"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);