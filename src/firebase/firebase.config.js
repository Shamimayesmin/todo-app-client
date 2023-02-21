// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqt3oTUpXbCHiI43Om8CGVf5yhH2luZf0",
  authDomain: "todo-app-1b805.firebaseapp.com",
  projectId: "todo-app-1b805",
  storageBucket: "todo-app-1b805.appspot.com",
  messagingSenderId: "870600625489",
  appId: "1:870600625489:web:1eaf9984cfbbe410645770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;