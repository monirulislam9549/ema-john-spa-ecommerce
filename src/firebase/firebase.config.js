// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrHIT1aK3xkbfMVCgnwS5YpRSFnN0JpiQ",
    authDomain: "ema-jhon-spa-auth-firebase.firebaseapp.com",
    projectId: "ema-jhon-spa-auth-firebase",
    storageBucket: "ema-jhon-spa-auth-firebase.appspot.com",
    messagingSenderId: "554426433576",
    appId: "1:554426433576:web:c91d36d77531b942a9751d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;