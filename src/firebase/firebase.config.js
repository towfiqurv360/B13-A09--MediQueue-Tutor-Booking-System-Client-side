import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdDhOfn0ImFj0_ikFM5g16o8-Bwo7QL6k",
  authDomain: "medi-queue-9c898.firebaseapp.com",
  projectId: "medi-queue-9c898",
  storageBucket: "medi-queue-9c898.firebasestorage.app",
  messagingSenderId: "400803659565",
  appId: "1:400803659565:web:6be87d2da79f3689c91da4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;