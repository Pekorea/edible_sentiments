import { useState } from "react";
import Navbar from "../components/Navsydbar";

function Home(){
   const [postsdey, setPostsdey] = useState(false)
   const [toggle, setToggle] = useState(false)

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
                <div className="post1"> 
                <h1 className="postcaption">Okay</h1>
                <img src={"/whiteB.png"}
                className="foodpic"
                alt="post media"
                ></img>
                <div className="postsbtndiv">
                    <button type="button">Comments</button>
                </div>
                </div>
                </div>
               }
            </div>
        </div>
    )
}
export default Home;