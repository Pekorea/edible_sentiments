import { useState, useEffect } from "react";
import Navbar from "../components/Navsydbar";
import { Toaster, toast } from "react-hot-toast";
import { CreatePost } from "../lib/helper";
import AuthProvided from "../lib/auth";
import { useNavigate } from "react-router";

function Posts() {
  const nav = useNavigate();
  const [media, setMedia] = useState(null);
  const [mediaFile, setMediaFile] = useState(null); // to store the actual file
  const [toggle2, setToggle2] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [caption, setCaption] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { userId } = AuthProvided();
  console.log(userId);

  useEffect(() => {
    console.log("Media URL:", media);
    console.log("Media File:", mediaFile);
  }, [media, mediaFile]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setMedia(URL.createObjectURL(e.target.files[0]));
      setMediaFile(e.target.files[0]); // Store the actual file
      setToggle2(true);
      setToggle1(true);
    }
  };

  const cancelPost = () => {
    setCaption('');
    setMedia(null);
    setMediaFile(null);
    setToggle1(false);
    setToggle2(false);
  };

  const handleUpload = async () => {
    try {
      if (!mediaFile) {
        toast.error("No media file selected!");
        return;
      }
      const overallSent = "neutral"; // This should be calculated based on your requirements
      await CreatePost(userId, overallSent, caption, mediaFile);
      cancelPost();
      toast.success('Post uploaded successfully!', { duration: 2000, icon: "🎉" });
      setTimeout(() => {
        nav(`/home`);
      }, 3700);
    } catch (error) {
      toast.error('Error uploading post: ' + error.message);
    }
  };

  return (
    <div className="pbody">
      <Toaster />
      <Navbar />
      <div className="postsCont">
        <form className="postsform">
          <h1 className="postshead">Create Post</h1>
          <button type="button" onClick={cancelPost} className="cancpbtn">X</button>
          <div className="pcont1">
            <textarea onChange={(e) => setCaption(e.target.value)} value={caption} required maxLength={50} className="caption" type="text" placeholder="Enter Caption.."></textarea>
            <input
              className={toggle1 ? "nopro" : 'yespro'}
              accept="image/png,image/jpeg"
              required
              onChange={handleChange}
              type="file"
            />
            <img src={toggle2 ? media : "/whiteB.png"}
              className={toggle2 ? "foodpic" : "nofoodpic"}
              alt="post picture"
            />
            <div className="pcont2">
              <button type='button' onClick={handleUpload} className="uploadpbtn">Upload</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Posts;
