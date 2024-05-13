import { useState } from "react";

function Makesure(){
    return(
        <div className="msCont">
            <div className="msrec">
                <h1>Are you sure you want to cancel this?</h1>
                <div className="msbtns">
                <button>Yes</button>
                <button>No</button>
                </div>
                
            </div>
        </div>
    )
}
export default Makesure;