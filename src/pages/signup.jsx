import { Link } from "react-router-dom";
import Header from "../components/header";
import { useState } from "react";
import {Toaster,toast} from 'react-hot-toast'

function Signup(){
  const [email, setEmail] = useState('');
  const [passKey, setPassKey] = useState('');
  const [compassKey, setcomPassKey] = useState('');
  const [Name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passKeyError, setPassKeyError] = useState('');
  const [NameError, setNameError] = useState('');

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const targetV = '@'
    setEmail(value);
    const containsCharacter = value.includes(targetV);
    console.log(containsCharacter)
    // Add validation logic for phone number
    if (containsCharacter == false) {
      setEmailError('Email must contain @');
    } else {
      setEmailError('');
    }
  };

  const handlePassKeyChange = (event) => {
    const value = event.target.value;
    setPassKey(value);
    // Add validation logic for passKey
    if (value.length < 6) {
      setPassKeyError('PassKey must be at least 6 characters long');
    } else {
      setPassKeyError('');
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    // Add validation logic for passKey
    if (value.length < 3 ) {
      setNameError('Name must be at least 3 characters long');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic
    toast("Registered", { duration: 1500, icon: "👌😎" });
  };
    return(
    <div className='Ocont'>
      <Toaster/>
      <Header/>
       <div className='cont2'>
        <div className='Validation'>

        <form onSubmit={handleSubmit} className='Signform'>
        <h1 className='lognote'>SIGN UP</h1>
        <div className='contInts'>
        <div>
        <label>Enter Name</label>
        <input required value={Name} onChange={handleNameChange} minLength={3} className='input' type='text'></input>
        {NameError && <h2 className="error">{NameError}</h2>}
        </div>
        <div>
        <label>Enter Email</label>
        <input required value={email} onChange={handleEmailChange} className='input' type='text' ></input>
        {emailError && <h2 className="error">{emailError}</h2>}
        </div>
        <div>
        <label>Enter PassKey</label>
        <input required value={passKey} onChange={handlePassKeyChange} className='input' type='password'></input>
        {passKeyError && <h2 className="error">{passKeyError}</h2>}
        </div>
        <div>
        <label>Confirm PassKey</label>
        <input required value={compassKey} onChange={handlecomPassKeyChange} className='input' type='password'></input>
        {compassKeyError && <h2 className="error">{compassKeyError}</h2>}
        </div>
        </div>
        <button className='regsub' type='submit'>Register</button>
        
        <Link className="loginL" to='/'>Login Page</Link>
        </form>
        </div>
       </div>
      </div>
    )
}
export default Signup;