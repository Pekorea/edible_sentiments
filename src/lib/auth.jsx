import { useState, useEffect } from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addUser } from "./helper";


export default function AuthProvided() {
  const [user, setUser] = useState("");

  const signUp = async (email, passkey, name, userType) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(auth, email, passkey);
      setUser(userInfo.user.uid);
      console.log(userInfo.user.uid); 
      await addUser(userInfo.user.uid, userType, name); // Pass the UID directly
    } catch (e) {
      console.error(e); // Changed to console.error for better error logging
      throw e;
    }
  };

  const resetpass = async (email)=>{
      try {
        await sendPasswordResetEmail(auth, email);
        console.log('Password reset email sent!');
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }
  const signIn = async (email, password) => {
    try {
      const signInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(signInUser.user.uid);
    } catch (e) {
      throw e;
    }
  };
  const signOutF = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch {}
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe;
  }, []);

  return {
    userId: user,
    signIn,
    signUp,
    signOutF,
  };
}
