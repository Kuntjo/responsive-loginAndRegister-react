// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxpc2b1kdmV4a0Ocml9kjPFf2UksXiLCY",
  authDomain: "i-wonder-baf9e.firebaseapp.com",
  projectId: "i-wonder-baf9e",
  storageBucket: "i-wonder-baf9e.appspot.com",
  messagingSenderId: "127047731558",
  appId: "1:127047731558:web:c83696b6f070a2ba9160a7",
  measurementId: "G-HER16RMKKR"
};

//to implement server, we use firebase where
//create new project
//create new web app
//npm install firebase
//

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
