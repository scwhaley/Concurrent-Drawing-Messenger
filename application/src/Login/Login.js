import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Login.css';
import {authenticate} from "./authenticate";

function Login(){
    var [username, setUsername] = useState("");
    var [password, setPassword] = useState("");

    //Get browser history
    let history = useHistory();

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
        var isLoggedIn = authenticate();

        if(isLoggedIn === true){
            history.goBack()
        };

        event.preventDefault();   
    }


    return(
        <div className="loginPage">
            <div className="loginForm">
                <h2>Login</h2>
                <form onSubmit={loginSubmitHandler}>
                    <input id="loginUsername" type="text" placeholder="Username" onChange={usernameChangeHandler} aria-label="Login Username"></input><br/>
                    <input id="loginPassword" type="text" placeholder="Password" onChange={passwordChangeHandler} aria-label="Login Password"></input><br/>
                    <div className="submitButton">
                        <input id="submit" type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default Login