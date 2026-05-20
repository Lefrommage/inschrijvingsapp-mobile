// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeVV_0tx-zz1l6y83RZuNUliFHJAAvlMM",
  authDomain: "mobile2526-4de1c.firebaseapp.com",
  projectId: "mobile2526-4de1c",
  storageBucket: "mobile2526-4de1c.firebasestorage.app",
  messagingSenderId: "857139075896",
  appId: "1:857139075896:web:5bc2fd444b9abb13f67fcd",
  measurementId: "G-31WWX6T2TD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
