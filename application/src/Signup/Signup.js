import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import User from "../User"
import fetchErr from '../Utils/FetchErr';
import SignupError from "./SignupError"
import './Signup.css'

function Signup(){

    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');

    var onPasswordMismatch = (password, confirmPassword) => {
        return ((password != confirmPassword) && (confirmPassword != '')) ? <div className='passwordMismatch'>Passwords do not match</div> : null;
    };

    var signupSubmitHandler = () => {

    };


    return(
        <div className="signupPage">
            <div className='signupContainer'>
                <h2>Signup</h2>
                <div className="signupFormContainer">
                    <form className="signupForm">
                        <input className="chooseUsername" type="text" placeholder="Choose Username" aria-label="Choose Username" onChange={e => setUsername(e.target.value)}></input>
                        <input className="choosePassword" type="password" placeholder="Choose Password" aria-label="Choose Password" onChange={e => setPassword(e.target.value)}></input>
                        <input className="confirmPassword" type="password" placeholder="Confirm Password" aria-label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}></input>
                        {onPasswordMismatch(password, confirmPassword)}
                        <button className="submitButton" onClick={signupSubmitHandler}>Log In</button>
                    </form>
                </div>
            </div>
            <div className="loginLinkContainer">
                <span>Already have an account? </span><Link to="/login" className="loginLink">Log in here!</Link>
            </div>
        </div>
    );
}

export default Signup;