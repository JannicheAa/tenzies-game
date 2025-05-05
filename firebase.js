import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_y0rK0cyaBy9NNVZyWy9qqgwlz14mW1I",
  authDomain: "tenzies-45578.firebaseapp.com",
  projectId: "tenzies-45578",
  storageBucket: "tenzies-45578.firebasestorage.app",
  messagingSenderId: "785881895294",
  appId: "1:785881895294:web:7b167f712570917c08632f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
