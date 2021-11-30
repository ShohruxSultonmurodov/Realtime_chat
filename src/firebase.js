
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBlb9JUhd_G_NrwOSMCYobTZiF_TeJRWjw",
  authDomain: "react-messenger-d50a9.firebaseapp.com",
  databaseURL:"http://react-messenger-d50a9.firebaseio.com",
  projectId: "react-messenger-d50a9",
  storageBucket:"react-messenger-d50a9.appspot.com",
  messagingSenderId: "167190109846",
  appId: "1:167190109846:web:940aad9ce8b46cab49ecb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, db, storage};