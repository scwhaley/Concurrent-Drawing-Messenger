import React, { Component } from 'react'
import './Login.css';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginUsername: "",
            loginPassword: "",
            chooseUsername: "",
            choosePassword: "",
            confirmPassword: ""
        };
    }

    loginChangeHandler = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    loginSubmitHandler = (event) => {
        //this.props.loginSubmitHandler(event);
        event.preventDefault();
        fetch('http://localhost:8080/api/greeting')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    render(){
        return(
            <div className="loginPage">
                <div className="loginForm">
                    <h2>Login</h2>
                    <form onSubmit={this.loginSubmitHandler}>
                        <input id="loginUsername" type="text" placeholder="Username" onChange={this.loginChangeHandler} aria-label="Login Username"></input><br/>
                        <input id="loginPassword" type="text" placeholder="Password" onChange={this.loginChangeHandler} aria-label="Login Password"></input><br/>
                        <div className="submitButton">
                            <input id="submit" type="submit" value="Submit"/>
                        </div>
                    </form>
                    <span>or</span>
                    <h2>Sign up here!</h2>
                    <form>
                        <input id="chooseUsername" type="text" placeholder="Choose Username" aria-label="Choose Username"></input><br/>
                        <input id="choosePassword" type="text" placeholder="Choose Password" aria-label="Choose Password"></input><br/>
                        <input id="confirmPassword" type="text" placeholder="Confirm Password" aria-label="Confirm Password"></input><br/>
                        <div className="submitButton">
                            <input id="createAccount" type="submit" value="Create Account"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login