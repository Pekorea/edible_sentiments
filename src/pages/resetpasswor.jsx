// src/components/PasswordReset.js
import React, { useState } from 'react';
import { error } from '../lib/error';
import {toast, Toaster} from 'react-hot-toast';
import AuthProvided from '../lib/auth';

const PasswordReset = () => {
   // const {resetPass} = AuthProvided();
    const [email, setEmail] = useState('');
   

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try{
            //await resetPass(email)
            toast.success('Email sent')
            console.log('Worked')
        }catch(e){
            toast.error(`Error: ${e.message}`)
        }
    };

    return (
        <div>
            <Toaster/>
            <h2>Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button  type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordReset;
