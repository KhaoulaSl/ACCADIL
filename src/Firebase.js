import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7vbjpXe4W6GLVcd2stuvnPMHTeuQE-a8",
  authDomain: "accadil.firebaseapp.com",
  projectId: "accadil",
  storageBucket: "accadil.appspot.com",
  messagingSenderId: "512482979739",
  appId: "1:512482979739:web:c2966000cefc85fdc6fb3e",
  measurementId: "G-G22X0Z1Z3F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
