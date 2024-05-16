import { useState } from "react";
import Navbar from "../components/Navsydbar";

function Account(){
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
    <input type='text' className="namefield" required></input>
    </div>
    <div className="numberDiv">
    <label>Email: </label>
    <input className="numberfield" required type='text'></input>
    </div>
    <div className="passkeyDiv">
    <label>Passkey: </label>
    <input type="password" className="passkeyfield" required></input>
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