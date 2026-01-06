import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAK713OAcuOLOovPz3rIs2xRaDVAAkty5I",
  authDomain: "visitarmanagement.firebaseapp.com",
  projectId: "visitarmanagement",
  storageBucket: "visitarmanagement.firebasestorage.app",
  messagingSenderId: "205219638570",
  appId: "1:205219638570:web:cb58ed95b8c4cb645f8253",
  measurementId: "G-5M9CQCK8PJ"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
