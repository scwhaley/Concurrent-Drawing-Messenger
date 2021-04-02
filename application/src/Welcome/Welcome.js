import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import './Welcome.css'

function Welcome(){
    //Check if user is already logged in
    var isLoggedIn = localStorage.getItem("isLoggedIn");

    //Page to display if not logged in
    function welcomePage(){
        return(
            <div className="welcomeContainer">
                <h1 className="title">Welcome to Website Name</h1>
                <h2 className="subtitle">Draw together with your friends to make a masterpiece!</h2>
                <Link className='welcomeLink loginLink' to="/login">Login</Link>
                <Link className='welcomeLink signupLink' to="/signup">Get Started</Link>
            </div>
        );
    }

    //If the user is already logged in, then just redirect to the main page
    return( isLoggedIn === "True" ? <Redirect to="/main"/> : welcomePage() )
}

export default Welcome;