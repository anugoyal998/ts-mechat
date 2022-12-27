// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT_wR3s_a8BjgGpEbmqo5lZ_myHkdv9IM",
  authDomain: "ts-mechat.firebaseapp.com",
  projectId: "ts-mechat",
  storageBucket: "ts-mechat.appspot.com",
  messagingSenderId: "625783513374",
  appId: "1:625783513374:web:e05bad8e0b8b8c1254e90f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
