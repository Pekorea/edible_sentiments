import { useState } from "react";
import Navbar from "../components/Navsydbar";

function Home(){
   const [postsdey, setPostsdey] = useState(false)
   const [toggle, setToggle] = useState(true)

   const checkPosts=()=>{
    setToggle(false)
   }
    return(
        < div className='homebody'>
            <Navbar/>
            
            <div className="package">
                {toggle ? 
               <div className="nopackage">
                <h1>Nothing posted Yet!</h1>
                </div> 
                :
                <div className="packageDEY">
                <div className="postsform"> 
                <div className="pcont1">
                <p value='Okay' required maxLength={50} className="caption" type="text" placeholder="Enter Caption.."></p>
                <input 
                className=''
                accept="image/png,image/jpeg">
                </input>
                <img src={"/whiteB.png"}
                className="foodpic"
                alt="post picture"
                ></img>
                </div>
                </div>
                </div>}
            </div>
        </div>
    )
}
export default Home;