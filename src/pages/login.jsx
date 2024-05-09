import { Link } from "react-router-dom";
import Header from "../components/header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [passKey, setPassKey] = useState('');

  const changeEmail=(e)=>{
    setEmail(e.target.value)
  }
  
  const changePasskey=(e)=>{
    setPassKey(e.target.value)
  }

  const Login = (event)=>{
    event.preventDefault();
    nav('/home')
  }
    return (
      <div className='Ocont'>
      <Header/>
       <div className='cont2'>
        <div className='Validation'>

        <form onSubmit={Login} className='Logform'>
        <h1 className='lognote'>Login</h1>
        <div className='contInp'>
        <div className='phonediv'>
        <label>Email</label>
        <input value={email} onChange={changeEmail} required autoComplete="off" className='input' type='text' ></input>
        </div>
        <div className="passdiv">
        <label>PassKey</label>
        <input value={passKey} onChange={changePasskey} required autoComplete="off" className='input' type='password'></input>
        </div>
        </div>
        <Link to='#' className="fplink"><p >Forgotten Password</p></Link>
        <button className='logsub' type='submit'>VERIFY</button>
        
       <Link to='/signup' className='signupL' >No Account?</Link> 
        </form>
        </div>
       </div>
      </div>
    )
}
export default Login;