// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Ua_J7nsIwGmb22rwuc0SX0bycqJN9ZI",
  authDomain: "borrowbuddy-794c1.firebaseapp.com",
  projectId: "borrowbuddy-794c1",
  storageBucket: "borrowbuddy-794c1.appspot.com",
  messagingSenderId: "694356625554",
  appId: "1:694356625554:web:1f16ea432e34046cb53e4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();