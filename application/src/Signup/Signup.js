import React from 'react'

function Signup(){
    return(
        <div>
            <h1>This is the Signup Page</h1>
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
    );
}

export default Signup;