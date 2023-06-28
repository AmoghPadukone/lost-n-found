// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp8tiCo7S7o2tTpcClOPKS1oTc8c8yrnI",
  authDomain: "lostnfound-2023.firebaseapp.com",
  projectId: "lostnfound-2023",
  storageBucket: "lostnfound-2023.appspot.com",
  messagingSenderId: "934957552689",
  appId: "1:934957552689:web:92eb5b2739dab085dd7110",
  measurementId: "G-BPV34D2QNP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
export const database = getFirestore(app);
export const dbInstance = collection(database, "reports");
// Create a storage reference from our storage service

const analytics = getAnalytics(app);
export default app;
