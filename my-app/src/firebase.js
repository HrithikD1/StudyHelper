// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG4TZXxOc9M7aAXWTrg8s-T1JJ3_7ddBM",
  authDomain: "studyhelper-78f39.firebaseapp.com",
  databaseURL: "https://studyhelper-78f39-default-rtdb.firebaseio.com",
  projectId: "studyhelper-78f39",
  storageBucket: "studyhelper-78f39.appspot.com",
  messagingSenderId: "719757649268",
  appId: "1:719757649268:web:4abdc8b17d14caf387f821",
  measurementId: "G-KV8RES86XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, firestore, storage };
