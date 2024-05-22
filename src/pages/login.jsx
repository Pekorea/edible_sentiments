import { Link } from "react-router-dom";
import Header from "../components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvided from "../lib/auth";
import { error } from "../lib/error";
import {toast, Toaster} from "react-hot-toast";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [passKey, setPassKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, userId } = AuthProvided();
  const changeEmail=(e)=>{
    setEmail(e.target.value)
  }
  
  const changePasskey=(e)=>{
    setPassKey(e.target.value)
  }

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = await signIn(email, passKey);
      toast("Successfully logged in", { duration: 3000, icon: "✔" });
      setLoading(false);
      setTimeout(() => {
        nav(`/home`);
      }, 1000);
    } catch (e) {
      const errorMessage = error(e.code);
      setLoading(false);
      toast(errorMessage, { duration: 2000, icon: "❌❌" });
    }
  }
    return (
      <div className='Ocont'>
        <Toaster/>
      <Header/>
       <div className='cont2'>
        <div className='Validation'>

        <form onSubmit={Login} className='Logform'>
        <h1 className='lognote'>Login</h1>
        <div className='contInp'>
        <div className='phonediv'>
        <label>Email</label>
        <input value={email} onChange={changeEmail} required autoComplete="off" className='input' type='email' ></input>
        </div>
        <div className="passdiv">
        <label>PassKey</label>
        <input value={passKey} onChange={changePasskey} required autoComplete="off" className='input' type='password'></input>
        </div>
        </div>
        <Link to='#' className="fplink"><p >Forgotten Password</p></Link>
        <button className='logsub' type='submit'>
        {loading ? "Loading..." : "VERIFY"}
        </button>
        
       <Link to='/signup' className='signupL' >No Account?</Link> 
        </form>
        </div>
       </div>
      </div>


      /*
      // UploadImage.js
import React, { useState } from 'react';
import { storage, firestore } from './firebase';

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // Save the download URL to Firestore
              firestore.collection('images').add({
                url,
                name: image.name,
              });
              setImage(null); // Reset the image state
            });
        }
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;

// DisplayImages.js
import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const DisplayImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageCollection = await firestore.collection('images').get();
      setImages(imageCollection.docs.map(doc => doc.data()));
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.url} alt={image.name} width="200" />
        </div>
      ))}
    </div>
  );
};

export default DisplayImages;








       */
    )
}
export default Login;