import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';

//Firebase configuration
const firebaseConfig = {
    //NOTE: UNSAFE, better to use environment variables but for development it's fine
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