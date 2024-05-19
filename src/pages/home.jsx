import { useState } from "react";
import Navbar from "../components/Navsydbar";
import SentimentAnalyzer from "./sentimenttest";

function Home(){
   const [postsdey, setPostsdey] = useState(false)
   const [toggle, setToggle] = useState(false)

   const checkPosts=()=>{
    setToggle(false)
   }
    return(
        < div className='homebody'>
            <Navbar/>
                {toggle ? 
               <SentimentAnalyzer/> 
                :
                <div className="packageDEY">
                <div className="post1"> 
                <h2> NAMEOFVENDOR</h2>
                <span>
                <h1 className="postcaption">alright Sushi - #500</h1>
                </span>
                <img src={"/fimage1.jpg"}
                className="foodpic"
                alt="post media"
                ></img>
                <div className="commentsbtndiv">
                    <button type="button">View Comments(3)</button>
                </div>
                </div>

                <div className="post1"> 
                <h2> NAMEOFVENDOR</h2>
                <span>
                <h1 className="postcaption">alright Sushi - #500</h1>
                </span>
                <img src={"/fimage1.jpg"}
                className="foodpic"
                alt="post media"
                ></img>
                <div className="commentsbtndiv">
                    <button type="button">View Comments(3)</button>
                </div>
                </div>

                <div className="post1"> 
                <h2> NAMEOFVENDOR</h2>
                <span>
                <h1 className="postcaption">alright Sushi - #500</h1>
                </span>
                <img src={"/fimage1.jpg"}
                className="foodpic"
                alt="post media"
                ></img>
                <div className="commentsbtndiv">
                    <button type="button">View Comments(3)</button>
                </div>
                </div>
                </div>
               }
            </div>
      
    )
}
export default Home;