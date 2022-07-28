// expo install firebase

import { initializeApp } from 'firebase/app';
import { getAuth, } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyAbb2c869Fo44EnX7fXX3SmgTfFdcT9Q10",
//     authDomain: "signal-clone-155af.firebaseapp.com",
//     projectId: "signal-clone-155af",
//     storageBucket: "signal-clone-155af.appspot.com",
//     messagingSenderId: "878423710011",
//     appId: "1:878423710011:web:1b0bfa0dd95a54cbe57f1e"
//   };
  const firebaseConfig = {
    apiKey: "AIzaSyAuHEiDU6yRWZAjUs4GHJ0nZpyWDXWJeFM",
    authDomain: "rooms-chat-562e8.firebaseapp.com",
    projectId: "rooms-chat-562e8",
    storageBucket: "rooms-chat-562e8.appspot.com",
    messagingSenderId: "1090693724847",
    appId: "1:1090693724847:web:a172cf1ad7d88524af725a"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

// getDocs(collection(db , 'Chats')).then((snapshot) => console.log(snapshot.docs.map((doc) => console.log(doc.data()))))
export default auth