import { useState,useRef,useEffect } from "react";
import { Link } from "react-router-dom";
function Navbar(){
    const [toggle, setToggle] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (toggle && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setToggle(false);
          }
        }
        document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggle]);

  const onClick = (event) => {
    event.stopPropagation();
    setToggle(!toggle)
    }
    return(
        <div className="genCont">
            <div className="barsCont">
                <div className="navB"> 
                <li onClick={onClick}>Menu</li>
                <li>Edible Sentiments</li>
                <li><Link to='/posts'>Post</Link></li>
                    
                </div>
                <div ref={sidebarRef} className={!toggle?"sideB":"sidesB"}>
                
                <div onClick={onClick} className="HeaderMB">
                <p className="closeMB" onClick={onClick}>x</p>
                
                </div>
                <li><Link to='/account'>Account </Link></li>
                <li><Link to='/posts'>Posts</Link></li>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/'>Logout</Link></li>
                
                </div>
            </div>
        </div>
    )
}
export default Navbar;