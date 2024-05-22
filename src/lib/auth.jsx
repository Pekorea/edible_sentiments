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

  const signUp = async (email, passkey, name,userType) => {
    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        passkey
      );
      setUser(userInfo.user.uid);
      console.log(user)
      await addUser(user, userType,name);
    } catch (e) {
      throw e;
    }
  };

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
