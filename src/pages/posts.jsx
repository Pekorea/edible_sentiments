import { useState } from "react";
import Navbar from "../components/Navsydbar";
import { Toaster,toast } from "react-hot-toast";

function Posts(){
   const [media, setMedia] = useState('')
   const [toggle2, setToggle2] = useState(false)
   const [toggle1, setToggle1] = useState(false)
   const [caption, setCaption] = useState(false)

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
return(
    <div className="pbody">
        <Toaster/>
    <Navbar/>
    <div className="postsCont">
       
            <form className="postsform"> 
            <h1 className="postshead">Create Post</h1>
            <div className="pcont1">
                <textarea onChange={(e)=> setCaption(e.target.value)} value={caption} required maxLength={50} className="caption" type="text" placeholder="Enter Caption.."></textarea>
                <input 
                className={toggle1 ? "nopro" : 'yespro'}
                accept="image/png,image/jpeg"
                onChange={handleChange} type="file">
                </input>
                <img src={toggle2 ? media : "/fimage1.jpg"}
                className="foodpic"
                alt="Profile Picture"
                ></img>
                <div className="pcont2">
                <button type="button" onClick={cancelPost} className="cancpbtn">Cancel</button>
                <button type='button' className="uploadpbtn">Upload</button>
                </div>
                </div>
            </form>
        </div>
    
    </div>
)
}
export default Posts;