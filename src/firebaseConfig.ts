import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCET6aR78DYKKfX38jchL7OHTqLMYEHLv8",
  authDomain: "todo-app-f2c92.firebaseapp.com",
  databaseURL: "https://todo-app-f2c92-default-rtdb.firebaseio.com",
  projectId: "todo-app-f2c92",
  storageBucket: "todo-app-f2c92.firebasestorage.app",
  messagingSenderId: "474414925088",
  appId: "1:474414925088:web:57de295770b4bfc2398345",
  measurementId: "G-98ZG2BC21Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);  // <-- Add this line to initialize Firestore

// const analytics = getAnalytics(app);

// Export Firestore operations (like batch update, etc.)
export const updateTaskOrder = async (reorderedTasks: any[]) => {
  const batch = writeBatch(db);  // <-- Use the 'db' here

  reorderedTasks.forEach((task, index) => {
    const taskRef = doc(db, "tasks", task.id);
    batch.update(taskRef, { order: index });
  });

  await batch.commit();
};
