import { useState } from "react";
import Navbar from "../components/Navsydbar";

function Home(){
   const [posts, setPosts] = useState([])
    return(
        < div className='homebody'>
            <Navbar/>
            <div className="package">
               <div className="nopackage">
                <h1>Nothing posted Yet!</h1>
                </div> 
                <div>
                    
                </div>
            </div>
        </div>
    )
}
export default Home;