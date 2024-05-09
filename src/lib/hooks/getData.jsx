import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

/*
export default function useGetData(userid) {
  const [data, setNotes] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!userid) {
      // Return early if userid is falsy
      setLoading(false);
      return;
    } 
    setLoading(true);
    const subColRef = query(
      collection(db, "users", userid, "notes"),
      orderBy("timeStamps", "desc")
      //where("isLocked", "==", false)
    );
    //console.log(subColRef);
    const unsub = onSnapshot(
      subColRef,
      (snap) => {
        const newArray = [];

        snap.forEach((doc) => newArray.push({ ...doc.data(), id: doc.id }));
        //console.log(newArray);
        setNotes(newArray);
        setLoading(false);
        //setRealdata(data.filter((note) => note.isLocked === true));
      },

      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [userid]);
  return {
    data,
    isloading,
    error,
  };
}
*/
