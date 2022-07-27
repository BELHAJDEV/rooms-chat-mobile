// expo install firebase

import { initializeApp } from 'firebase/app';
import { getAuth, } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbb2c869Fo44EnX7fXX3SmgTfFdcT9Q10",
    authDomain: "signal-clone-155af.firebaseapp.com",
    projectId: "signal-clone-155af",
    storageBucket: "signal-clone-155af.appspot.com",
    messagingSenderId: "878423710011",
    appId: "1:878423710011:web:1b0bfa0dd95a54cbe57f1e"
  };



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

// getDocs(collection(db , 'Chats')).then((snapshot) => console.log(snapshot.docs.map((doc) => console.log(doc.data()))))
export default auth