import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import './Login.css';
import User from "../User"
import fetchErr from '../Utils/FetchErr';

function Login(){
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");
    var [successfulLogin, setSuccessfulLogin] = useState(false);
    var [credsInvalid, setCredsInvalid] = useState(false);

    var usernameChangeHandler = (event) => {
        setUsername(event.target.value);
        console.log("Username = " + username);
    }

    var passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        console.log("Password = " + password);
    }

    //Upon log in submission, redirect the user to the page they came from
    var loginSubmitHandler = (event) => {
        var user = new User(username, password);
        console.log(JSON.stringify(user));

        //Post user credentials to login URL
        fetchErr('http://localhost:8080/api/public/login',
                {method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                })
                .then(response => {
                    return response.headers;
                })
                //If successful, then get the JWT out of the Authorization header and store in local storage
                .then(headers => {
                    let JWT = headers.get('Authorization');
                    localStorage.setItem('JWT', JWT);
                    console.log('Set JWT in local storage')
                    return true;
                })
                .then(successful => {
                    console.log(successful)
                    if(successful === true){
                        console.log("Going back...")
                        setSuccessfulLogin(true);
                        setCredsInvalid(false);
                    };
                })
                //If unsuccessful. log the error
                .catch(error => {
                    setCredsInvalid(true);
                    error.response.json()
                    .then(json => {
                        console.log(json)
                    })
                });

        //Prevent page refresh
        event.preventDefault(); 
    }

    if(successfulLogin){
        return <Redirect push to="/main"/>
    }

    return(
        <div className="loginPage">
            <div className='loginContainer'>
                <h2>Login</h2>
                <div className="loginFormContainer">
                    <form className="loginForm">
                        {credsInvalid ? <div className='invalidCreds'>Invalid credentials</div> : null}
                        <input className="loginUsername" type="text" placeholder="Username" onChange={usernameChangeHandler} aria-label="Login Username"></input>
                        <input className="loginPassword" type="password" placeholder="Password" onChange={passwordChangeHandler} aria-label="Login Password"></input>
                        <Link to="/login"className="forgotPassword">Forgot Password?</Link>
                        <button className="submitButton" onClick={loginSubmitHandler}>Log In</button>
                    </form>
                </div>
            </div>
            <div className="signUpLinkContainer">
                <span>Don't have an account? </span><Link to="/signup" className="signUpLink">Sign up here!</Link>
            </div>
        </div>
    );
    
}

export default Login;