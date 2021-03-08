import fetchJSON from "../Utils/FetchJSON";

export function authenticate(user){

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
            .then(headers => headers.forEach(console.log))
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