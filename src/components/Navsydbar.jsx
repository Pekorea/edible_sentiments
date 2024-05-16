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
  const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
     });
   const handleResize = () => {
     setWindowSize({
     width: window.innerWidth,
      height: window.innerHeight,
      });
    
        // Check if the sidebar should be automatically closed based on screen size
        if (window.innerWidth > 760) {
          setToggle(false);
        }
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize); // Add resize event listener
        return () => window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    }, []);
    return(
        <div className="genCont">
            <div className="barsCont">
                <div className="navB"> 
                <li className="hnav" onClick={onClick}>Menu</li>
                <li className="hnav"><Link to='/home'>Edible Sentiments</Link></li>
                <li className="hnav"><Link to='/posts'>Post</Link></li>

                <div className="navsideb">
                <h3><Link to='/home'>Edible Sentiments</Link></h3>
                <li><Link to='/account'>Account </Link></li>
                <li><Link to='/posts'>Posts</Link></li>
                <li><Link to='/history'>History</Link></li>
                <li><Link to='/'>Logout</Link></li>
                </div>

                
                   
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