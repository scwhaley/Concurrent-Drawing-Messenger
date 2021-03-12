import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './Login.css';
import User from "../User"
import fetchJSON from "../Utils/FetchJSON";

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
        var user = new User(username, password);
        console.log(JSON.stringify(user));

        //Post user credentials to login URL
        fetchJSON('http://localhost:8080/api/public/login',
                {method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
                })
                .then(response => {
                    console.log(response);
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
                    if(successful == true){
                        console.log("Going back...")
                        history.goBack()
                    };
                })
                //If unsuccessful. log the error
                .catch(error => {
                    console.log("Error.response: " + error.response);
                    console.log("Error.responseJSON: " + error.responseJSON);
                });

        //Prevent page refresh
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