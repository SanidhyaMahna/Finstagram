// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgiWck_0cIS9959JsGjDE_bq6dT6_rgAE",
  authDomain: "finstagram-af1c3.firebaseapp.com",
  projectId: "finstagram-af1c3",
  storageBucket: "finstagram-af1c3.appspot.com",
  messagingSenderId: "398393133857",
  appId: "1:398393133857:web:93bad0e686df8fb4334c60",
  measurementId: "G-KSYL3H47XE"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };