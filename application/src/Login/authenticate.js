import fetchJSON from "../Utils/FetchJSON";

export function authenticate(user){

    console.log(JSON.stringify(user));
    //Post user credentials to login URL
    fetchJSON('http://localhost:8080/login',
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

            })
            //If unsuccessful. log the error
            .catch(error => {
                console.log(error.responseJSON);
                //console.log(error.responseJSON.message);
                //setErrorMessage(error.responseJSON.message);
                return false;
            });

}

export function checkIfAlreadyLoggedIn(){
    var isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    var isLoggedIn = isLoggedInLocalStorage === "True" ? true : false;
    return isLoggedIn;
}