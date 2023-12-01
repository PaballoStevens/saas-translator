import { getApp , getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyAXmSh0LJcRYmFlfI2u200Xwg_qrqGE4ZA",
    authDomain: "saas-translation-b4d02.firebaseapp.com",
    projectId: "saas-translation-b4d02",
    storageBucket: "saas-translation-b4d02.appspot.com",
    messagingSenderId: "400158371481",
    appId: "1:400158371481:web:fe2c0bbedc090fff0e1208"
  };

 const app = getApps().length ? getApp() : initializeApp(firebaseConfig); 
 const auth = getAuth(app);
 const db = getFirestore(app);
 const functions = getFunctions(app);

 export { db , functions , auth};