import { useState,useEffect } from "react";
import Navbar from "../components/Navsydbar";
import SentimentAnalyzer from "./sentimenttest";
import AuthProvided from "../lib/auth";
import {toast,Toaster} from "react-hot-toast";

function Home(){
  const{userId} = AuthProvided();
  console.log(userId)
  
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);

  
   const [postsdey, setPostsdey] = useState(false)
   const [toggle, setToggle] = useState(false)
   const [toggle2, setToggle2] = useState(false)
   const [showComments, setShowComments] = useState(false);

   const toggleComments = () => {
     setShowComments(!showComments);
   };
   
   const checkPosts=()=>{
    setToggle(false)
   }
    return(
        < div className='homebody'>
          <Toaster/>
            <Navbar/>
                {toggle ? 
               <SentimentAnalyzer/> 
                :
                <div className="packageDEY">
                <div className="post1">
                  <h2 className="post1h2">NAMEOFVENDOR</h2>
                  <div className="postcaption">alright Sushi - #500 </div>
                  <img
                    src={"/fimage1.jpg"}
                    className="foodpic"
                    alt="post media"
                  />
                  <div className="commentsbtndiv">
                    <button type="button" onClick={toggleComments}>
                      {showComments ? 'Hide Comments(3)' : 'View Comments(3)'}
                    </button>
                  </div>
                  {showComments &&
                  <div className={`comments-container ${showComments ? 'show' : ''}`}>
                  <div className="comments-content">
                    <div>
                    <p className='commentsh3'>Comments</p>
                    <button type="button" className="close-btn" onClick={toggleComments}>X</button>
                    </div>
                    <h2 className="commentName">Commentor</h2>
                    <p className="comments">Comment 1</p>
                  </div>
                </div>}
                </div>
                </div>
               }
            </div>
      
    )
}
export default Home;