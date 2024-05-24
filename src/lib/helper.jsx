
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
import { db,imgDb } from "./firebase";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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



export async function CreatePost(userId, overallSent, caption, mediaFile) {
  try {
    console.log(userId);
    if (!userId) {
      return null;
    }

    const collectionRef = collection(db, "Users");
    const querySnapshot = await getDocs(query(collectionRef, where("userId", "==", userId)));

    let userType = null;
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(userData);
      userType = userData.userType;
    });

    if (userType !== 'vendor') {
      console.error('Customer can\'t create posts');
      return;
    }

    if (!mediaFile) {
      console.error('No media file provided');
      return;
    }

    const uniqueId = `${mediaFile.name}_${Date.now()}`;
    const storageRef = ref(imgDb, `media/${uniqueId}`);
    const uploadTask = uploadBytesResumable(storageRef, mediaFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "POST"), {
          numcomments: 0,
          created_at: new Date(),
          userId: userId,
          sentiment: overallSent,
          caption: caption,
          pictureurl: downloadURL,
        });
      }
    );

  } catch (e) {
    console.error('This error occurred: ', e);
  }
}

/*export async function CreatePost(userId,overallSent, caption, mediaFile ) 
{ 
  try {
    console.log(userId);
    if(!userId){
      return null;
  }try {
    const collectionRef = collection(db, "Users");
    const querySnapshot = await getDocs(
      query(collectionRef, where("userId", "==", userId))
    );
    let userType = null;
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      console.log(userData);
      userType = userData.userType;
      if(userType=='vendor'){
        try{
        const newPost = addDoc(collection(db, "posts"), { // Use collection reference
          numcomments:0,
          created_at: new Date(),
          userId: userId, 
          sentiment:overallSent,
          caption:caption,
          pictureurl:mediaFile,
        });
        return newPost;
      } catch (e) {
        console.error(e); // Changed to console.error for better error logging
      }
      }
      return console.error('Customer cant create posts' )
    });
}catch(e){
    console.error('this error occured: ',e)
  }
}catch(e){
  console.error('this error occured: ',e)
}}
*/
export async function fetchVendorPosts(vendorId) {
  try {
    const postsCollectionRef = collection(db, 'POST');
    const q = query(
      postsCollectionRef,
      where('userId', '==', vendorId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    console.log(posts)
    return posts;
  } catch (error) {
    console.error('Error fetching vendor posts:', error);
    throw error;
  }
}

export const deletePost = async (postId, imageUrl) => {
  try {
    // Delete the post document from Firestore
    await deleteDoc(doc(db, 'POST', postId));
    
    // Extract the filename from the imageUrl
    const imageName = imageUrl.split('/media%2F')[1].split('?')[0];
    
    // Delete the image from Firebase Storage
    const imageRef = ref(imgDb, `media/${imageName}`);
    await deleteObject(imageRef);
    
    return true;
  } catch (error) {
    console.error('Error deleting post: ', error);
    throw error;
  }
};

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
    /*if (!userId) return null; // Return null for no user ID
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
        */
        if (!userId) return [];
        try {
          let data = [];
          const collectionref = query(
            collection(db, "posts"),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(collectionref);
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
          });
      
          return data;
        } catch (e) {
          console.error("Error fetching Posts: ", e);
          throw new Error(e);
        }
      }
     /* });
  
      return [userData]; // Return the user's name and userType (or null if not found)
    } catch (e) {
      console.error("Error getting name: ", e);
      throw new Error(e);
    }
}*/
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

