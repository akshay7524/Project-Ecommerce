// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDSEv8yS0u1SbTl-MbdL1HfW0gJ8cJcH-M",
  authDomain: "react-auth-b016f.firebaseapp.com",
  projectId: "react-auth-b016f",
  storageBucket: "react-auth-b016f.appspot.com",
  messagingSenderId: "366224730115",
  appId: "1:366224730115:web:07ea5f1e868c2a3054c636",
  measurementId: "G-8Q28H01ZN2"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();


export { auth, googleAuthProvider };
