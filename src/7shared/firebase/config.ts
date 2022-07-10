import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "paste your data",
  authDomain: "paste your data",
  projectId: "paste your data",
  storageBucket: "paste your data",
  messagingSenderId: "paste your data",
  appId: "paste your data",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
