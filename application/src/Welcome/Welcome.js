import React from 'react'
import {Link, Redirect} from 'react-router-dom';

function Welcome(){
    //Check if user is already logged in
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    //Page to display if not logged in
    function welcomePage(){
        return(
            <div>
                <h1>Welcome to Concurrent Drawing Messenger</h1>
                <Link to="/login">Login</Link>
                <p>or</p>
                <Link to="/signup">Signup</Link>
                <p>or</p>
                <Link to="/test">Test</Link>
            </div>
        );
    }

    //If the user is already logged in, then just redirect to the main page
    return( isLoggedIn === "True" ? <Redirect to="/main"/> : welcomePage() )
}

export default Welcome;