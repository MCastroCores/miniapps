// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
console.log(import.meta.env.VITE_AUTH_DOMAIN);
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Inicializamos Firebase
export const app = initializeApp(firebaseConfig);

// Configuramos el acceso a auth
export const auth = getAuth(app);

// Configuramos el acceso a db y sus funciones asociadas
export const db = getFirestore(app);

// Configuramos el acceso a storage y sus funciones asociadas
export const storage = getStorage(app);

// Funciones para el manejo de datos
export const userExists = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log(res.exists());
    return res.exists();
  } catch (error) {
    console.log(error);
  }
};

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, `${user.uid}`);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (user, profilePicture) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, `${user.uid}`);
    await setDoc(docRef, { ...user, profilePicture });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log(res.data());
    return res.data();
  } catch (error) {
    console.log(error);
  }
};

export const registerNewTask = async (task) => {
  try {
    const collectionRef = collection(db, "tasks");
    const docRef = doc(collectionRef, `${task.id}`);
    await setDoc(docRef, task);
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async (uid) => {
  try {
    const tasks = [];
    const collectionRef = collection(db, "tasks");
    const q = query(collectionRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const task = { ...doc.data() };
      tasks.push(task);
    });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (task) => {
  try {
    const docRef = doc(db, "tasks", task.id);
    const res = await setDoc(docRef, task);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id) => {
  try {
    const docRef = doc(db, "tasks", id);
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const setUserProfilePhoto = async (uid, file) => {
  try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfilePhotoUrl = async (profilePicture) => {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.log(error);
  }
};
