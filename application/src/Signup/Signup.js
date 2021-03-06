import React, { useState } from 'react'
import User from "../User"

function Signup(){

    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [confirmPassword, setConfirmPassword] = useState('');

    function testAPI(){
        console.log("clicked");

        var newUser = new User(username, password);

        fetch('http://localhost:8080/api/public/signup', 
        {method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
        })
        //.then(response => response.json())
        .then(json => console.log(json));
    }

    return(
        <div>
            <h1>This is the Signup Page</h1>
            <h2>Sign up here!</h2>
            <form>
                <input id="chooseUsername" type="text" placeholder="Choose Username" aria-label="Choose Username" onChange={e => setUsername(e.target.value)}></input><br/>
                <input id="choosePassword" type="text" placeholder="Choose Password" aria-label="Choose Password" onChange={e => setPassword(e.target.value)}></input><br/>
                <input id="confirmPassword" type="text" placeholder="Confirm Password" aria-label="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}></input><br/>
                <div className="submitButton">
                    <input id="createAccount" type="submit" value="Create Account"/>
                </div>
            </form>
            <button onClick={testAPI}>Send GET</button>
        </div>
    );
}

export default Signup;