import React from 'react'

function Signup(){

    function testAPI(){
        console.log("clicked");
        // fetch("http://localhost:8080/api/greeting", {
        //     credentials: 'include',
        //     headers: {
        //         'Access-Control-Allow-Credentials': true,
        //         'Authorization': 'Basic dXNlcjpUZXN0MTIzNDU='
        //       },
        //   }).then(response => response.json()).then(data => console.log(data))

          fetch('http://localhost:8080/api/greeting', {method:'GET', 
          headers: {'Authorization': 'Basic ' + btoa('user:pass')}})
          .then(response => response.json())
          .then(json => console.log(json));
    }

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
            <button onClick={testAPI}>Send GET</button>
        </div>
    );
}

export default Signup;