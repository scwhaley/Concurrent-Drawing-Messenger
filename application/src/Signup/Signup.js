import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import User from "../User"
import fetchErr from '../Utils/FetchErr';
import SignupError from "./SignupError"
import './Signup.css'

function Signup(){

    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    var [passwordMismatch, setPasswordMismatch] = useState(false);
    var [credsInvalid, setCredsInvalid] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');

    //when password or confirm password change, then check for mismatch
    useEffect(() => {
        if((password != confirmPassword) && (confirmPassword != '')){
            setPasswordMismatch(true);
        }
        else{
            setPasswordMismatch(false);
        }
    },[password,confirmPassword])

    useEffect(() => {
        setCredsInvalid(false);
        setErrorMessage('');
    },[password,confirmPassword,username])

    var signupSubmitHandler = (event) => {
        var user = new User(username, password);
        console.log(JSON.stringify(user));

        //Post user credentials to login URL
        fetchErr('http://localhost:8080/api/public/signup',
                {method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                })
                .then(response => {
                    return response.json();
                })
                //If successful, then get the JWT out of the Authorization header and store in local storage
                .then(json => {
                    console.log(json.message);
                    setCredsInvalid(false);
                    setErrorMessage('');
                })
                //If unsuccessful, display the error message
                .catch(error => {
                    error.response.json()
                    .then(json => {
                        setCredsInvalid(true);
                        setErrorMessage(json.message)
                    })
                });

        //Prevent page refresh
        event.preventDefault(); 

    };

    return(
        <div className="signupPage">
            <div className='signupContainer'>
                <h2>Signup</h2>
                <div className="signupFormContainer">
                    <form className="signupForm">
                        {credsInvalid ? <div className='invalidCreds fadeIn'>{errorMessage}</div> : null}
                        <input className="chooseUsername" type="text" placeholder="Choose Username" aria-label="Choose Username" onChange={e => setUsername(e.target.value)}></input>
                        <input className="choosePassword" type="password" placeholder="Choose Password" aria-label="Choose Password" onChange={e => setPassword(e.target.value)}></input>
                        <input className={passwordMismatch ? "confirmPasswordMismatch" : "confirmPassword"} type="password" placeholder="Confirm Password" aria-label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}></input>
                        {passwordMismatch ? <div className='passwordMismatchPrompt fadeIn'>Passwords do not match</div> : null}
                        <button className="submitButton" onClick={signupSubmitHandler}>Log In</button>
                    </form>
                </div>
            </div>
            <div className="loginInsteadLinkContainer">
                <span>Already have an account? </span><Link to="/login" className="loginInsteadLink">Log in here!</Link>
            </div>
        </div>
    );
}

export default Signup;