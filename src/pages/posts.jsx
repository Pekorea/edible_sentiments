import { useState } from "react";
import Navbar from "../components/Navsydbar";
import { Toaster,toast } from "react-hot-toast";
import { storage, firestore } from '../lib/firebase';
import { collection,getDoc } from "firebase/firestore";

function Posts(){
   const [media, setMedia] = useState(null)
   const [toggle2, setToggle2] = useState(false)
   const [toggle1, setToggle1] = useState(false)
   const [caption, setCaption] = useState('')

  console.log(caption)
   function handleChange(e) {
    console.log(e.target.files);
    try {
      setMedia(URL.createObjectURL(e.target.files[0]));
      console.log(media);
      setToggle2(true);
      setToggle1(true);
    } catch (e) {
      toast(e, { duration: 2000, icon: "🎈🎈" });
    }
  }
  const cancelPost=()=>{
    setCaption('')
    setMedia('')
    setToggle1(false)
    setToggle2(false)
  }


  const handleUpload = () => {
    if (media) {
      const uploadTask = storage.ref(`media/${media.name}`).put(media);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: track the upload progress
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          // Get the download URL after upload completes
          storage
            .ref('media')
            .child(media.name)
            .getDownloadURL()
            .then((url) => {
              // Save the download URL to Firestore
              firestore.collection('media').add({
                url,
                name: media.name,
              });
              setMedia(null); // Reset the image state
            });
        }
      );
    }
  };



return(
    <div className="pbody">
        <Toaster/>
    <Navbar/>
    <div className="postsCont">
            <form className="postsform"> 
            <h1 className="postshead">Create Post</h1>
            <button type="button" onClick={cancelPost} className="cancpbtn">X</button>
            <div className="pcont1">
                <textarea onChange={(e)=> setCaption(e.target.value)} value={caption} required maxLength={50} className="caption" type="text" placeholder="Enter Caption.."></textarea>
                <input 
                className={toggle1 ? "nopro" : 'yespro'}
                accept="image/png,image/jpeg"
                onChange={handleChange} type="file">
                </input>
                <img src={toggle2 ? media : "/whiteB.png"}
                className={toggle2 ?"foodpic":"nofoodpic"}
                alt="post picture"
                ></img>
                <div className="pcont2">
                <button type='button' onClick={handleUpload} className="uploadpbtn">Upload</button>
                </div>
                </div>
            </form>
        </div>
    
    </div>
)
}
export default Posts;