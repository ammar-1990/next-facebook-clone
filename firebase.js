import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyA0OZ1Oi7bMMuY-0qSmI_PbiWaPq08Ih5Q",
    authDomain: "facebook-clone-79b1b.firebaseapp.com",
    projectId: "facebook-clone-79b1b",
    storageBucket: "facebook-clone-79b1b.appspot.com",
    messagingSenderId: "632244098999",
    appId: "1:632244098999:web:1bebd28e2eb034759dfa32"
  };
  

  const app = initializeApp(firebaseConfig);
  export const  auth = getAuth(app);
  export const db = getFirestore(app);