import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Check Config voor geen rode boze lijntjes (Danku Reddit)
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeVV_0tx-zz1l6y83RZuNUliFHJAAvlMM",
  authDomain: "mobile2526-4de1c.firebaseapp.com",
  projectId: "mobile2526-4de1c",
  storageBucket: "mobile2526-4de1c.firebasestorage.app",
  messagingSenderId: "857139075896",
  appId: "1:857139075896:web:5bc2fd444b9abb13f67fcd",
  measurementId: "G-31WWX6T2TD",
};

const app = initializeApp(firebaseConfig);

// Use initializeAuth instead of getAuth, and pass AsyncStorage as the persistence layer
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
