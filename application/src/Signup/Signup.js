import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import User from "../User"
import fetchErr from '../Utils/FetchErr';
import SignupError from "./SignupError"

function Signup(){

    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');
    var [submitError, setSubmitError] = useState(false);
    var [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();

    function testAPI(){
        setSubmitError(false);
        var newUser = new User(username, password);

        fetchErr('http://localhost:8080/api/public/signup', 
        {method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
        })
        .then(response => {
            return response.json()
        })
        .then(responseBody => {
            console.log("Message is: \n\n" + responseBody.message)
        })
        .then(() => {
            //can't just put history.push('/login') because the first argument of setTimeout
            //expects a callback. If we were to just pass in history.push('/login'), then it
            //would execute history.push then provide the return (undefined) as the argument to setTimeout
            setTimeout(() => history.push('/login'), 1000);
        })
        .catch(error => {
            console.log("In Catch")
            setSubmitError(true);
            console.log(error.response)
            error.response.json().then(responseBody => {
                console.log("Message is: " + responseBody.message)
            })           
        })
    }


    function testSecured(){
        var JWT = localStorage.getItem('JWT')
        fetchErr('http://localhost:8080/api/secured/greeting', 
        {method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JWT
        },
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => {
            console.log("Error JSON: " + error.responseJSON);
            //console.log(error.responseJSON.message);
        })
        ;
    }

    return(
        <div>
            <h1>This is the Signup Page</h1>
            <h2>Sign up here!</h2>
            <h2>The error message is: {errorMessage}</h2>
            <form>
                <input id="chooseUsername" type="text" placeholder="Choose Username" aria-label="Choose Username" onChange={e => setUsername(e.target.value)}></input><br/>
                <input id="choosePassword" type="text" placeholder="Choose Password" aria-label="Choose Password" onChange={e => setPassword(e.target.value)}></input><br/>
                <input id="confirmPassword" type="text" placeholder="Confirm Password" aria-label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}></input><br/>
                <div className="submitButton">
                    <input id="createAccount" type="submit" value="Create Account"/>
                </div>
            </form>
            <button onClick={testAPI}>Send GET</button>
            <SignupError submitError={submitError} errorMessage={errorMessage}/>
            <button onClick={testSecured}>Test Secured</button>
        </div>
    );
}

export default Signup;