import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useState } from "react";
import {Toaster,toast} from 'react-hot-toast'
//import { error } from "../lib/error";
//import AuthProvided from "../lib/auth";

function Signup(){
  const [email, setEmail] = useState('');
  const [passKey, setPassKey] = useState('');
  const [compassKey, setcomPassKey] = useState('');
  const [Name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passKeyError, setPassKeyError] = useState('');
  const [NameError, setNameError] = useState('');
  const nav = useNavigate()
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
  const [userType, setUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast(`Registered as a ${userType}`, { duration: 1500, icon: "👌😎" });
    nav('/home')
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
        <input type='email' required value={email} onChange={handleEmailChange} className='input' ></input>
        {emailError && <h2 className="error">{emailError}</h2>}
        </div>
        <div>
        <label>Enter PassKey</label>
        <input required value={passKey} minLength={6} onChange={handlePassKeyChange} className='input' type='password'></input>
        {passKeyError && <h2 className="error">{passKeyError}</h2>}
        </div>
        
        <span className="userType">
          <label>Select your user-Type</label>
          <div className="userTypeselection">
          <div>
          <label>
          <input
            type="radio"
            required
            name="userType"
            value="customer"
            checked={userType === 'customer'}
            onChange={handleUserTypeChange}
          />
          Customer
        </label>
        </div>
        
        <div>
          <label>
          <input
            type="radio"
            required
            name="userType"
            value="vendor"
            checked={userType === 'vendor'}
            onChange={handleUserTypeChange}
          />
          Vendor
        </label>
        </div>
          </div>
          
        

          
        </span>
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