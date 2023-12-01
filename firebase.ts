import { getApp , getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

 const app = getApps().length ? getApp() : initializeApp(firebaseConfig); 
 const auth = getAuth(app);
 const db = getFirestore(app);
 const functions = getFunctions(app);

 export { db , functions , auth};