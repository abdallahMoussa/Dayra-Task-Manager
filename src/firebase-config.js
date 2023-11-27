// Firebase Configuration
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCQSfnHfH3MWek4xEYoIfsCJhj0LbmIbRU",
  authDomain: "dayra-87bea.firebaseapp.com",
  databaseURL: "https://dayra-87bea-default-rtdb.firebaseio.com",
  projectId: "dayra-87bea",
  storageBucket: "dayra-87bea.appspot.com",
  messagingSenderId: "775137154400",
  appId: "1:775137154400:web:1d5a687e341b3e0f3ffa05",
  measurementId: "G-KGPKGS445Z",
};

//initialize application
const app = initializeApp(firebaseConfig);
//initialize authentication
const auth = getAuth(app);
//initialize database
const db = getFirestore(app);

export { app, auth, db };
