import { db } from "./firebase";
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


/*
export async function addUser(user, name) {
  try {
    const newUser = await setDoc(doc(db, "users", user), {
      userid: user,
      name: name,
      LPasscode: "",
    });
    return newUser;
  } catch (e) {
    console.log(e);
  }
}

export async function AddNote(note, userid) {
  try {
    const docRef = doc(db, "users", userid);
    const colRef = await addDoc(collection(docRef, "notes"), {
      ...note,
      isFavorited: false,
      isLocked: false,
      timeStamps: serverTimestamp(),
    });
    return colRef;
  } catch (e) {
    throw e;
  }
}

export async function getPc(userId) {
  if (!userId) return null; // Return null for no user ID
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userid", "==", userId))
    );

    let userPc = null;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(userData);
      userPc = userData.LPasscode;
    });

    return userPc;
  } catch (e) {
    console.error("Error getting name: ", e);
    throw new Error(e);
  }
}

export function useGetSearchRes(userid, title) {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    }

    const subColRef = query(
      collection(db, "users", userid, "notes"),
      where("title", "==", title)
    );
    console.log(title);
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];
        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));
        setData(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  console.log(data);
  return {
    data,
    isloading,
    error,
  };
}

export async function getName(userId) {
  if (!userId) return null; // Return null for no user ID
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userid", "==", userId))
    );

    let userName = null;

    querySnapshot.forEach((doc) => {
      // Assuming there's a "name" field in the user's document
      const userData = doc.data();
      //console.log(userData);
      userName = userData.name; // Set userName if the user is found
    });

    return userName; // Return the user's name (or null if not found)
  } catch (e) {
    console.error("Error getting name: ", e);
    throw new Error(e);
  }
}
export async function updatePasscode(LPasscode, userId) {
  try {
    // Get a reference to the specific user document based on userId
    const docRef = doc(db, "users", userId);

    // Update the document with the new passcode
    await updateDoc(docRef, {
      LPasscode,
    });

    console.log("Passcode updated successfully");
  } catch (e) {
    console.error("Error updating passcode: ", e);
    throw e; // Re-throw the error for handling in the calling code
  }
}

// export async function getFave(userId) {
//   if (!userId) return [];
//   try {
//     let notes = [];
//     const collectionref = query(
//       collection(db, "users", userId, "notes"),
//       where("isFavorited", "==", true)
//     );

//     const querySnapshot = await getDocs(collectionref);
//     querySnapshot.forEach((doc) => {
//       notes.push({ ...doc.data(), id: doc.id });
//     });

//     return notes;
//   } catch (e) {
//     console.error("Error fetching Favorite notes: ", e);
//     throw new Error(e);
//   }
// }

export function useGetFave(userid) {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    }

    const subColRef = query(
      collection(db, "users", userid, "notes"),
      where("isFavorited", "==", true)
    );
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];

        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));

        setData(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  console.log(data);
  return {
    data,
    isloading,
    error,
  };
}

export function useGetLocked(userid) {
  const [data, setData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    }

    const subColRef = query(
      collection(db, "users", userid, "notes"),
      where("isLocked", "==", true)
    );
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];

        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));

        setData(newArray);
        setLoading(false);
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  console.log(data);
  return {
    data,
    isloading,
    error,
  };
}

export async function getOneNote(noteId, userId) {
  const docRef = doc(db, "users", userId, "notes", noteId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
    //return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return null;
}

export async function updateNote(noteId, userId, data) {
  const docRef = doc(db, "users", userId, "notes", noteId);
  const docSnap = await updateDoc(docRef, {
    ...data,
  });

  console.log(docSnap);
}

export async function deleteNote(noteId, userId) {
  const docref = doc(db, "users", userId, "notes", noteId);
  await deleteDoc(docref);
}
*/