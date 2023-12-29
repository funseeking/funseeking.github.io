// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyDT3SlIEx-KjXMhH9b64KimDPv3NkfDR2Y",
  authDomain: "fun-seeking.firebaseapp.com",
  projectId: "fun-seeking",
  storageBucket: "fun-seeking.appspot.com",
  messagingSenderId: "346317536610",
  appId: "1:346317536610:web:bd6f184063c7abe682c03b",
  measurementId: "G-ND837YRNW8",
});

// reference auth and firestore SDKs as global variables
// SDK = software development kit
// ASKs provide APIs and libraries to connect to cloud services
export const auth = firebase.auth();
export const firestore = firebase.firestore();
