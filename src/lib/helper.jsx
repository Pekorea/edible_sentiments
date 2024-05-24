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
import { db,storage } from "./firebase";

export async function addUser(userId, userType, name) { // Changed parameter name to userId for clarity
  try { 
    console.log(userId); 
    const newUser = await addDoc(collection(db, "Users"), { // Use collection reference
      Name: name,
      created_at: new Date(),
      userId: userId, // Use the passed userId directly
      userType: userType,
    });
    return newUser;
  } catch (e) {
    console.error(e); 
  }
}
export async function CreatePost(userId,overallSent, caption, mediaFile ) { // Changed parameter name to userId for clarity
  try {
    console.log(userId);
    const newPost = await addDoc(collection(db, "posts"), { // Use collection reference
      numcomments:0,
      created_at: new Date(),
      userId: userId, 
      sentiment:overallSent,
      caption:caption,
      picture:mediaFile,
    });
    return newPost;
  } catch (e) {
    console.error(e); // Changed to console.error for better error logging
  }
}

export async function getNameandUT(userId) {
  if (!userId) return null; // Return null for no user ID
  try {
    const collectionRef = collection(db, "Users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userId", "==", userId))
    );
    let userName = null;
    let userType = null;
    querySnapshot.forEach((doc) => {
      
      const userData = doc.data();
//      console.log(userData);
      userName = userData.Name;
      userType = userData.userType;
      //console.log(userName)
    });

    return { userName, userType }; // Return the user's name and userType (or null if not found)
  } catch (e) {
    console.error("Error getting name: ", e);
    throw new Error(e);
  }
}
  export async function getPosts(userId) {
    if (!userId) return null; // Return null for no user ID
    try {
      const collectionRef = collection(db, "posts");
      const querySnapshot = await getDocs(
        query(collectionRef, where("userId", "==", userId))
      );
      let pictureurl = null;
      let caption = null;
      querySnapshot.forEach((doc) => {
        
        const userData = doc.data();
        console.log(userData);
        caption = userData.caption;
        pictureurl = userData.picture;
        //console.log(userName)
      });
  
      return [userData]; // Return the user's name and userType (or null if not found)
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

