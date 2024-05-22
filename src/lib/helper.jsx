//import { db } from "./firebase";
import { useState, useEffect } from "react";
import {
  query,
  setDoc,
  doc,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  getDoc,
  updateDoc,
  deleteDoc,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addUser(user,userType, name) {
  try {
    const newUser = await setDoc(doc(db, "Users", user), {
      userId: user,
      Name: name,
      created_at:new Date(),
      userType:userType,
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
}

export async function getName(userId) {
  const [loading,setLoading] = useState(false)
  if (!userId) return null; // Return null for no user ID
  try {
    setLoading(true)
    const collectionRef = collection(db, "Users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userId", "==", userId))
    );
    let userName = null
    querySnapshot.forEach((doc) => {
      // Assuming there's a "name" field in the user's document
      const userData = doc.data();
      console.log(userData);
      userName = userData.name; // Set userName if the user is found
    });

    return userName; // Return the user's name (or null if not found)
  } catch (e) {
    console.error("Error getting name: ", e);
    throw new Error(e);
  }
}
/*
export const signUpUser = async (email, password, name, userType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Add user data to Firestore
    await setDoc(doc(db, "Users", user.uid), {
      Name: name,
      created_at: new Date(),
      userType: userType, // "admin" or "regular"
      userId: user.uid,
    });

    console.log("User signed up and added to Firestore:", user.uid);
  } catch (error) {
    console.error("Error signing up user:", error);
  }
};*/

