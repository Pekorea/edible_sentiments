import { useState,useEffect } from "react";
import Navbar from "../components/Navsydbar";
import AuthProvided from "../lib/auth";
import { getNameandUT } from "../lib/helper";

function Account(){
    const{userId}=AuthProvided();
    const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return null;

      try {
        setLoading(true);
        const userData = await getNameandUT(userId);
        if (userData) {
          setUserName(userData.userName);
          setUserType(userData.userType);
          console.log(userName)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }



return(
    <>
    <div className="acctCont">
    <Navbar/>
    <div className="aconts">
    <form className="personalinfo" >
        <span className="profileDiv">
            {/*<input type='file'></input>*/}
            <h1>
                PROFILE
            </h1>
            <h1>Avatar</h1>
        </span>
   <div className="nameDiv">
    <label>Name: </label>
    <input defaultValue={userName} type='text' className="namefield" required></input>
    </div>
    
    <div className="userTypeDiv">
    <label>UserType: </label>
    <input defaultValue={userType} type="text" className='userTypefield' required></input>
   </div>
   <span>
    <button type="button" className="chaveninfobtn">Modify Passkey</button>
   </span>
    </form>
    </div>
    </div>
    </>
)
}
export default Account;